package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Audio;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.repositories.AudioRepository;
import com.btec.webmusic_api.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SongService {

    private final SongRepository songRepository;
    private final AudioRepository audioRepository;
    private final RestTemplate restTemplate;

    // Danh sách từ khóa cho phân tích cảm xúc
    private static final Map<String, List<String>> MOOD_KEYWORDS = Map.of(
            "happy", List.of("love", "happy", "joy", "fun", "dance", "smile", "bright", "cheer"),
            "sad", List.of("sad", "cry", "tears", "alone", "heartbreak", "loss", "blue", "lonely"),
            "relax", List.of("calm", "peace", "chill", "slow", "soft", "dream", "quiet", "serene"),
            "angry", List.of("rage", "angry", "fight", "hate", "fire", "storm", "break", "fury")
    );

    // Danh sách category theo mood
    private static final Map<String, List<String>> MOOD_TO_CATEGORY = Map.of(
            "happy", List.of("Pop", "Dance", "Rock" , "Chill" ),
            "sad", List.of("Ballad", "Acoustic"),
            "relax", List.of("Jazz", "Classical","Ambient","Pop","Dance","Rock","Chill"),
            "angry", List.of("Rock", "Metal")
    );

    @Autowired
    public SongService(SongRepository songRepository, AudioRepository audioRepository) {
        this.songRepository = songRepository;
        this.audioRepository = audioRepository;
        this.restTemplate = new RestTemplate();
    }

    // Gợi ý bài hát dựa trên userId, mood và history từ bên ngoài
    public List<Map<String, Object>> recommendSongs(String userId, String mood, List<Map<String, Object>> history) {
        List<Map<String, Object>> allSongs = getAllSongs();
        Set<String> listenedSongIds = history.stream()
                .map(h -> (String) h.get("songId"))
                .collect(Collectors.toSet());

        // Tính tần suất category và artist từ lịch sử
        Map<String, Long> categoryFrequency = history.stream()
                .map(h -> (String) h.get("category"))
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(
                        category -> category,
                        Collectors.counting()
                ));

        Map<String, Long> artistFrequency = history.stream()
                .flatMap(h -> ((List<String>) h.get("artists")).stream())
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(
                        artist -> artist,
                        Collectors.counting()
                ));

        // Danh sách gợi ý
        Map<Map<String, Object>, Double> scoredSongs = new HashMap<>();
        List<String> validCategories = MOOD_TO_CATEGORY.getOrDefault(mood.toLowerCase(), List.of());

        for (Map<String, Object> song : allSongs) {
            String songId = (String) song.get("id");
            if (listenedSongIds.contains(songId)) continue;

            String category = (String) song.get("category");
            List<String> artists = (List<String>) song.get("artists");
            String title = (String) song.get("title");
            String description = song.containsKey("description") ? (String) song.get("description") : "";

            String titleMood = analyzeSentiment(title);
            String descMood = analyzeSentiment(description);

            double score = calculateScore(mood, titleMood, descMood, category, artists,
                    validCategories, categoryFrequency, artistFrequency);
            if (score > 0) {
                scoredSongs.put(song, score);
            }
        }

        return scoredSongs.entrySet().stream()
                .sorted(Map.Entry.<Map<String, Object>, Double>comparingByValue().reversed())
                .limit(5)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    // Phân tích cảm xúc từ văn bản
    private String analyzeSentiment(String text) {
        if (text == null || text.trim().isEmpty()) return "neutral";

        String textLower = text.toLowerCase();
        Map<String, Integer> moodScores = new HashMap<>();

        for (Map.Entry<String, List<String>> entry : MOOD_KEYWORDS.entrySet()) {
            String mood = entry.getKey();
            List<String> keywords = entry.getValue();
            int score = 0;
            for (String keyword : keywords) {
                if (textLower.contains(keyword)) {
                    score++;
                }
            }
            moodScores.put(mood, score);
        }

        return moodScores.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("neutral");
    }

    // Tính điểm cho bài hát
    private double calculateScore(String userMood, String titleMood, String descMood, String category,
                                  List<String> artists, List<String> validCategories,
                                  Map<String, Long> categoryFrequency, Map<String, Long> artistFrequency) {
        double score = 0.0;

        if (userMood.equalsIgnoreCase(titleMood)) score += 0.4;
        if (userMood.equalsIgnoreCase(descMood)) score += 0.3;
        if (validCategories.contains(category)) score += 0.3;

        Long categoryCount = categoryFrequency.getOrDefault(category, 0L);
        score += categoryCount * 0.15;

        for (String artist : artists) {
            Long artistCount = artistFrequency.getOrDefault(artist, 0L);
            score += artistCount * 0.05;
        }

        return score;
    }

    // Các phương thức hiện có
    public Song createSong(Song song) {
        validateSong(song);
        return songRepository.save(song);
    }

    public List<Map<String, Object>> getAllSongs() {
        List<Song> songs = songRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();
        for (Song song : songs) {
            response.add(buildSongResponse(song));
        }
        return response;
    }

    public Optional<Map<String, Object>> getSongById(String id) {
        Optional<Song> songOptional = songRepository.findById(id);
        return songOptional.map(this::buildSongResponse);
    }

    public Optional<Song> updateSong(String id, Song updatedSong) {
        Optional<Song> songOptional = songRepository.findById(id);
        if (songOptional.isEmpty()) {
            return Optional.empty();
        }
        Song song = songOptional.get();
        song.setTitle(updatedSong.getTitle());
        song.setArtistIds(updatedSong.getArtistIds());
        song.setIdAudio(updatedSong.getIdAudio());
        song.setIdImage(updatedSong.getIdImage());
        song.setCategory(updatedSong.getCategory());
        song.setDescription(updatedSong.getDescription());
        validateSong(song);
        return Optional.of(songRepository.save(song));
    }

    public boolean deleteSong(String id) {
        if (!songRepository.existsById(id)) {
            return false;
        }
        songRepository.deleteById(id);
        return true;
    }

    public Optional<Map<String, Object>> getSongAudio(String songId) {
        Optional<Song> songOptional = songRepository.findById(songId);
        if (songOptional.isEmpty()) {
            return Optional.empty();
        }
        Song song = songOptional.get();
        Optional<Audio> audioOptional = audioRepository.findById(song.getIdAudio());
        if (audioOptional.isEmpty()) {
            return Optional.empty();
        }
        Audio audio = audioOptional.get();
        Map<String, Object> audioData = new HashMap<>();
        audioData.put("mp3Data", audio.getData());
        audioData.put("duration", audio.getDuration() != null ? audio.getDuration() : "0:00");
        audioData.put("fileName", audio.getFileName() != null ? audio.getFileName() : "song.mp3");
        audioData.put("title", song.getTitle() != null ? song.getTitle() : "Unknown Title");
        audioData.put("category", song.getCategory() != null ? song.getCategory() : "Unknown Category");
        audioData.put("artist", String.join(", ", getArtistNames(song.getArtistIds())));
        audioData.put("idImage", song.getIdImage());
        return Optional.of(audioData);
    }

    private void validateSong(Song song) {
        if (song.getTitle() == null || song.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be empty.");
        }
        if (song.getArtistIds() == null || song.getArtistIds().isEmpty()) {
            throw new IllegalArgumentException("At least one artist is required.");
        }
        if (song.getIdAudio() == null || song.getIdAudio().trim().isEmpty()) {
            throw new IllegalArgumentException("Audio ID cannot be empty.");
        }
        if (song.getIdImage() == null || song.getIdImage().trim().isEmpty()) {
            throw new IllegalArgumentException("Image ID cannot be empty.");
        }
        if (song.getCategory() == null || song.getCategory().trim().isEmpty()) {
            throw new IllegalArgumentException("Category cannot be empty.");
        }
    }

    private List<String> getArtistNames(List<String> artistIds) {
        List<String> artistNames = new ArrayList<>();
        if (artistIds == null || artistIds.isEmpty()) {
            return List.of("Unknown Artist");
        }
        for (String artistId : artistIds) {
            String artistApiUrl = "http://localhost:8080/api/artists/" + artistId;
            try {
                Map<String, Object> artistResponse = restTemplate.getForObject(artistApiUrl, Map.class);
                if (artistResponse != null && artistResponse.containsKey("name")) {
                    artistNames.add(artistResponse.get("name").toString());
                } else {
                    artistNames.add("Unknown Artist");
                }
            } catch (Exception e) {
                System.err.println("Error fetching artist with ID " + artistId + ": " + e.getMessage());
                artistNames.add("Unknown Artist");
            }
        }
        return artistNames;
    }

    private Map<String, Object> buildSongResponse(Song song) {
        Map<String, Object> songData = new HashMap<>();
        songData.put("id", song.getId());
        songData.put("title", song.getTitle());
        songData.put("artists", getArtistNames(song.getArtistIds()));
        songData.put("category", song.getCategory());
        songData.put("image", getImageData(song.getIdImage()));
        songData.put("description", song.getDescription() != null ? song.getDescription() : "");
        return songData;
    }

    private Map<String, Object> getImageData(String imageId) {
        String imageApiUrl = "http://localhost:8080/api/images/" + imageId;
        try {
            Map<String, Object> imageData = restTemplate.getForObject(imageApiUrl, Map.class);
            if (imageData != null) {
                return imageData;
            } else {
                return Map.of("id", imageId, "url", "Unknown Image");
            }
        } catch (Exception e) {
            return Map.of("id", imageId, "url", "Error fetching image");
        }
    }
}