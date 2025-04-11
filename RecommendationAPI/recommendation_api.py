from flask import Flask, request, jsonify
from surprise import SVD, Dataset, Reader
import pandas as pd
from pymongo import MongoClient
import os

print("Step 1: Starting the application...")

app = Flask(__name__)

# Kết nối với MongoDB
print("Step 2: Connecting to MongoDB...")
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['webmusic-database']
    history_collection = db['history']
    songs_collection = db['songs']
    artists_collection = db['artists']
    print("Step 3: Connected to MongoDB successfully!")
except Exception as e:
    print(f"Step 3: Failed to connect to MongoDB: {e}")
    exit(1)

# Lấy dữ liệu từ MongoDB
def load_data():
    print("Step 4: Loading data from MongoDB...")
    history_data = list(history_collection.find())
    print(f"Step 5: Loaded {len(history_data)} history records")
    data = []
    for entry in history_data:
        user_id = entry.get('userId')
        song_id = entry.get('songId')
        if user_id and song_id:
            data.append({'user_id': user_id, 'song_id': song_id, 'rating': 1})
        else:
            print(f"Skipping invalid history entry: {entry}")
    df = pd.DataFrame(data)
    print(f"Step 5.1: DataFrame created with {len(df)} rows")
    return df

# Huấn luyện mô hình
def train_model():
    print("Step 6: Training model...")
    df = load_data()
    if df.empty:
        print("Step 7: No data to train model.")
        return None
    try:
        reader = Reader(rating_scale=(1, 5))
        data = Dataset.load_from_df(df[['user_id', 'song_id', 'rating']], reader)
        # Dùng toàn bộ dữ liệu để huấn luyện
        trainset = data.build_full_trainset()
        model = SVD()
        model.fit(trainset)
        print("Step 7: Model trained successfully!")
        return model
    except Exception as e:
        print(f"Step 7: Failed to train model: {e}")
        return None

model = train_model()

@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = request.args.get('user_id')
    if not user_id:
        print("Step 8: Missing user_id in request")
        return jsonify({'error': 'user_id is required'}), 400

    if not model:
        print("Step 8: Model not trained, returning empty recommendations")
        return jsonify([]), 200

    print(f"Step 8: Fetching songs for recommendation for user {user_id}...")
    songs = list(songs_collection.find())
    print(f"Step 8.1: Found {len(songs)} songs in database")
    song_ids = [song['_id'] for song in songs]

    predictions = []
    for song_id in song_ids:
        try:
            pred = model.predict(user_id, song_id)
            predictions.append({'song_id': song_id, 'score': pred.est})
        except Exception as e:
            print(f"Step 8.2: Error predicting for song {song_id}: {e}")
            continue

    if not predictions:
        print("Step 8.3: No predictions generated, returning empty recommendations")
        return jsonify([]), 200

    predictions.sort(key=lambda x: x['score'], reverse=True)
    top_recommendations = predictions[:5]
    print(f"Step 8.4: Top {len(top_recommendations)} recommendations selected")

    recommended_songs = []
    for pred in top_recommendations:
        song = songs_collection.find_one({'_id': pred['song_id']})
        if song:
            # Lấy tên nghệ sĩ từ artistIds
            artist_id = song.get('artistIds', [])[0] if song.get('artistIds') else None
            artist = artists_collection.find_one({'_id': artist_id}) if artist_id else None
            artist_name = artist.get('name', 'Unknown Artist') if artist else 'Unknown Artist'

            # Chuyển đổi idImage và idAudio thành URL
            image_url = f"http://localhost:8080/api/images/{song.get('idImage', 'default')}"
            audio_url = f"http://localhost:8080/api/audios/{song.get('idAudio', '')}"

            recommended_songs.append({
                'songId': str(song['_id']),
                'title': song.get('title', 'Unknown Title'),
                'artist': artist_name,
                'imageUrl': image_url,
                'audioUrl': audio_url
            })
        else:
            print(f"Step 8.5: Song {pred['song_id']} not found in songs collection")

    print(f"Step 8.6: Returning {len(recommended_songs)} recommended songs")
    return jsonify(recommended_songs), 200

if __name__ == '__main__':
    print("Step 9: Starting Flask server...")
    app.run(host='0.0.0.0', port=5001)