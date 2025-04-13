from flask import Flask, request, jsonify
from surprise import SVD, Dataset, Reader
import pandas as pd
from pymongo import MongoClient
from bson.objectid import ObjectId  # Import ObjectId

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
    print(f"History data: {history_data}")
    data = []
    for entry in history_data:
        user_id = entry.get('userId')
        song_id = entry.get('songId')
        listen_count = entry.get('listenCount', 1)
        user_rating = entry.get('rating', None)
        rating = user_rating if user_rating is not None else min(listen_count, 5)
        if user_id and song_id:
            data.append({'user_id': user_id, 'song_id': song_id, 'rating': rating})
        else:
            print(f"Skipping invalid history entry: {entry}")
    df = pd.DataFrame(data)
    print(f"Step 5.1: DataFrame created with {len(df)} rows")
    print(f"DataFrame:\n{df}")
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
        trainset = data.build_full_trainset()
        model = SVD()
        model.fit(trainset)
        print("Step 7: Model trained successfully!")
        return model
    except Exception as e:
        print(f"Step 7: Failed to train model: {e}")
        return None

@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = request.args.get('user_id')
    if not user_id:
        print("Step 8: Missing user_id in request")
        return jsonify({'error': 'user_id is required'}), 400

    # Huấn luyện lại mô hình với dữ liệu mới nhất
    print("Step 8: Retraining model with latest data...")
    model = train_model()
    if not model:
        print("Step 8: Model not trained, returning empty recommendations")
        return jsonify([]), 200

    print(f"Step 8: Fetching songs for recommendation for user {user_id}...")
    songs = list(songs_collection.find())
    print(f"Step 8.1: Found {len(songs)} songs in database")
    song_ids = [song['_id'] for song in songs]

    # Lấy lịch sử nghe để xác định sở thích
    history_data = list(history_collection.find({"userId": user_id}))
    if not history_data:
        print(f"Step 8.2: No history found for user {user_id}, returning default recommendations")
        return jsonify([]), 200

    preferred_categories = set()
    preferred_artists = set()
    for entry in history_data:
        song_id = entry['songId']
        # Convert song_id string to ObjectId
        try:
            song_id_obj = ObjectId(song_id)
        except Exception as e:
            print(f"Step 8.3: Invalid songId format for {song_id}: {e}")
            continue

        song = songs_collection.find_one({'_id': song_id_obj})
        if song:
            if 'category' in song and song['category']:
                preferred_categories.add(song['category'])
            if 'artistIds' in song and song['artistIds']:
                preferred_artists.update(song['artistIds'])
        else:
            print(f"Step 8.3: Song {song_id} not found in songs_collection")

    print(f"Step 8.4: Preferred categories: {preferred_categories}")
    print(f"Step 8.5: Preferred artists: {preferred_artists}")

    # Dự đoán với SVD và ưu tiên bài hát có cùng thể loại hoặc nghệ sĩ
    predictions = []
    history_song_ids = set(entry['songId'] for entry in history_data)  # Loại bỏ bài hát đã nghe
    for song_id in song_ids:
        # Convert song_id to string for comparison with history_song_ids
        song_id_str = str(song_id)
        if song_id_str in history_song_ids:
            continue  # Bỏ qua các bài hát đã có trong lịch sử nghe

        try:
            pred = model.predict(user_id, song_id_str)
            score = pred.est

            # Kiểm tra xem bài hát có cùng thể loại hoặc nghệ sĩ không
            song = songs_collection.find_one({'_id': song_id})
            if song:
                song_category = song.get('category', '')
                song_artists = set(song.get('artistIds', []))
                # Tăng điểm nếu bài hát có cùng thể loại hoặc nghệ sĩ
                if song_category in preferred_categories:
                    score += 3.0  # Tăng trọng số cho cùng thể loại
                    print(f"Boosting score for song {song_id} by 3.0 due to matching category: {song_category}")
                if song_artists & preferred_artists:
                    score += 5.0  # Tăng trọng số mạnh hơn cho cùng nghệ sĩ
                    print(f"Boosting score for song {song_id} by 5.0 due to matching artists: {song_artists & preferred_artists}")

            predictions.append({'song_id': song_id, 'score': score})
        except Exception as e:
            print(f"Step 8.6: Error predicting for song {song_id}: {e}")
            continue

    if not predictions:
        print("Step 8.7: No predictions generated, returning empty recommendations")
        return jsonify([]), 200

    predictions.sort(key=lambda x: x['score'], reverse=True)
    top_recommendations = predictions[:5]
    print(f"Step 8.8: Top 5 recommendations selected: {top_recommendations}")

    recommended_songs = []
    for pred in top_recommendations:
        song = songs_collection.find_one({'_id': pred['song_id']})
        if song:
            artist_id = song.get('artistIds', [])[0] if song.get('artistIds') else None
            artist = artists_collection.find_one({'_id': artist_id}) if artist_id else None
            artist_name = artist.get('name', 'Unknown Artist') if artist else 'Unknown Artist'

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
            print(f"Step 8.9: Song {pred['song_id']} not found in songs collection")

    print(f"Step 8.10: Returning {len(recommended_songs)} recommended songs")
    return jsonify(recommended_songs), 200

if __name__ == '__main__':
    print("Step 9: Starting Flask server...")
    app.run(host='0.0.0.0', port=5001)