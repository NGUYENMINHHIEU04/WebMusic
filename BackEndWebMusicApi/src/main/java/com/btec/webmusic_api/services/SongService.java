//package com.btec.webmusic_api.services;
//
//import com.btec.webmusic_api.entities.Audio;
//import com.btec.webmusic_api.entities.Song;
//import com.btec.webmusic_api.repositories.AudioRepository;
//import com.btec.webmusic_api.repositories.SongRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.*;
//
//@Service
//public class SongService {
//
//    private final SongRepository songRepository;
//    private final AudioRepository audioRepository;
//    private final RestTemplate restTemplate;
//
//    @Autowired
//    public SongService(SongRepository songRepository, AudioRepository audioRepository) {
//        this.songRepository = songRepository;
//        this.audioRepository = audioRepository;
//        this.restTemplate = new RestTemplate();
//    }
//
//    // Tạo bài hát mới
//    public Song createSong(Song song) {
//        validateSong(song);
//        return songRepository.save(song);
//    }
//
//    // Lấy tất cả bài hát
//    public List<Map<String, Object>> getAllSongs() {
//        List<Song> songs = songRepository.findAll();
//        List<Map<String, Object>> response = new ArrayList<>();
//
//        for (Song song : songs) {
//            response.add(buildSongResponse(song));
//        }
//        return response;
//    }
//
//    // Lấy bài hát theo ID
//    public Optional<Map<String, Object>> getSongById(String id) {
//        Optional<Song> songOptional = songRepository.findById(id);
//        return songOptional.map(this::buildSongResponse);
//    }
//
//    // Cập nhật bài hát
//    public Optional<Song> updateSong(String id, Song updatedSong) {
//        Optional<Song> songOptional = songRepository.findById(id);
//        if (songOptional.isEmpty()) {
//            return Optional.empty();
//        }
//
//        Song song = songOptional.get();
//        song.setTitle(updatedSong.getTitle());
//        song.setArtistIds(updatedSong.getArtistIds());
//        song.setIdAudio(updatedSong.getIdAudio());
//        song.setIdImage(updatedSong.getIdImage());
//        song.setCategory(updatedSong.getCategory());
//        song.setLyrics(updatedSong.getLyrics());
//
//        validateSong(song);
//        return Optional.of(songRepository.save(song));
//    }
//
//    // Xóa bài hát
//    public boolean deleteSong(String id) {
//        if (!songRepository.existsById(id)) {
//            return false;
//        }
//        songRepository.deleteById(id);
//        return true;
//    }
//
//    // Lấy file MP3 và duration từ Audio của bài hát
//    public Optional<Map<String, Object>> getSongAudio(String songId) {
//        Optional<Song> songOptional = songRepository.findById(songId);
//        if (songOptional.isEmpty()) {
//            return Optional.empty();
//        }
//
//        Song song = songOptional.get();
//        Optional<Audio> audioOptional = audioRepository.findById(song.getIdAudio());
//        if (audioOptional.isEmpty()) {
//            return Optional.empty();
//        }
//
//        Audio audio = audioOptional.get();
//        Map<String, Object> audioData = new HashMap<>();
//        audioData.put("mp3Data", audio.getData());
//        audioData.put("duration", audio.getDuration());
//        audioData.put("fileName", audio.getFileName());
//
//        return Optional.of(audioData);
//    }
//
//    // Validate dữ liệu bài hát
//    private void validateSong(Song song) {
//        if (song.getTitle() == null || song.getTitle().trim().isEmpty()) {
//            throw new IllegalArgumentException("Title cannot be empty.");
//        }
//        if (song.getArtistIds() == null || song.getArtistIds().isEmpty()) {
//            throw new IllegalArgumentException("At least one artist is required.");
//        }
//        if (song.getIdAudio() == null || song.getIdAudio().trim().isEmpty()) {
//            throw new IllegalArgumentException("Audio ID cannot be empty.");
//        }
//        if (song.getIdImage() == null || song.getIdImage().trim().isEmpty()) {
//            throw new IllegalArgumentException("Image ID cannot be empty.");
//        }
//        if (song.getCategory() == null || song.getCategory().trim().isEmpty()) {
//            throw new IllegalArgumentException("Category cannot be empty.");
//        }
//        // Lyrics có thể null, không bắt buộc
//    }
//
//    // Lấy danh sách tên nghệ sĩ từ API Artist
//    private List<String> getArtistNames(List<String> artistIds) {
//        List<String> artistNames = new ArrayList<>();
//        if (artistIds == null) {
//            return List.of("Unknown Artist");
//        }
//
//        for (String artistId : artistIds) {
//            String artistApiUrl = "http://localhost:8080/api/artists/" + artistId;
//            try {
//                Map<String, Object> artist = restTemplate.getForObject(artistApiUrl, Map.class);
//                if (artist != null && artist.get("name") != null) {
//                    artistNames.add(artist.get("name").toString());
//                } else {
//                    artistNames.add("Unknown Artist");
//                }
//            } catch (Exception e) {
//                artistNames.add("Unknown Artist");
//            }
//        }
//        return artistNames;
//    }
//
//    // Xây dựng response cho bài hát, bao gồm thông tin từ API images
//    private Map<String, Object> buildSongResponse(Song song) {
//        Map<String, Object> songData = new HashMap<>();
//        songData.put("id", song.getId());
//        songData.put("title", song.getTitle());
//        songData.put("artists", getArtistNames(song.getArtistIds()));
//        songData.put("category", song.getCategory());
//        songData.put("lyrics", song.getLyrics());
//
//        // Thêm thông tin idImage từ API images
//        songData.put("image", getImageData(song.getIdImage()));
//
//        return songData;
//    }
//
//    // Lấy thông tin hình ảnh từ API images
//    private Map<String, Object> getImageData(String imageId) {
//        String imageApiUrl = "http://localhost:8080/api/images/" + imageId; // Điều chỉnh URL theo API thực tế
//        try {
//            Map<String, Object> imageData = restTemplate.getForObject(imageApiUrl, Map.class);
//            if (imageData != null) {
//                return imageData; // Trả về toàn bộ dữ liệu hình ảnh (hoặc chỉ lấy các trường cần thiết)
//            } else {
//                return Map.of("id", imageId, "url", "Unknown Image");
//            }
//        } catch (Exception e) {
//            return Map.of("id", imageId, "url", "Error fetching image");
//        }
//    }
//}

package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Audio;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.repositories.AudioRepository;
import com.btec.webmusic_api.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class SongService {

    private final SongRepository songRepository;
    private final AudioRepository audioRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public SongService(SongRepository songRepository, AudioRepository audioRepository) {
        this.songRepository = songRepository;
        this.audioRepository = audioRepository;
        this.restTemplate = new RestTemplate();
    }

    // Tạo bài hát mới
    public Song createSong(Song song) {
        validateSong(song);
        return songRepository.save(song);
    }

    // Lấy tất cả bài hát
    public List<Map<String, Object>> getAllSongs() {
        List<Song> songs = songRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Song song : songs) {
            response.add(buildSongResponse(song));
        }
        return response;
    }

    // Lấy bài hát theo ID
//    public Optional<Map<String, Object>> getSongById(String id) {
//        Optional<Song> songOptional = songRepository.findById(id);
//        return songOptional.map(this::buildSongResponse);
//    }

    // Cập nhật bài hát
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
        validateSong(song);
        return Optional.of(songRepository.save(song));
    }

    // Xóa bài hát
    public boolean deleteSong(String id) {
        if (!songRepository.existsById(id)) {
            return false;
        }
        songRepository.deleteById(id);
        return true;
    }

    // Lấy file MP3 và thông tin bài hát
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
        audioData.put("duration", audio.getDuration());
        audioData.put("fileName", audio.getFileName());
        audioData.put("title", song.getTitle() != null ? song.getTitle() : "Unknown Title");
        audioData.put("category", song.getCategory() != null ? song.getCategory() : "Unknown Category");
        audioData.put("artist", String.join(", ", getArtistNames(song.getArtistIds())));

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

    public Optional<Map<String, Object>> getSongById(String id) {
        Optional<Song> songOptional = songRepository.findById(id);
        return songOptional.map(song -> {
            Map<String, Object> songData = new HashMap<>();
            songData.put("id", song.getId());
            songData.put("title", song.getTitle() != null ? song.getTitle() : "Unknown Title");
            songData.put("artists", getArtistNames(song.getArtistIds()));
            songData.put("category", song.getCategory() != null ? song.getCategory() : "unknown");
            songData.put("image", getImageData(song.getIdImage()));
            return songData;
        });
    }

    // Lấy danh sách tên nghệ sĩ từ API Artist
    private List<String> getArtistNames(List<String> artistIds) {
        List<String> artistNames = new ArrayList<>();
        if (artistIds == null || artistIds.isEmpty()) {
            return List.of("Unknown Artist");
        }

        for (String artistId : artistIds) {
            String artistApiUrl = "http://localhost:8080/api/artists/" + artistId;
            try {
                Map<String, Object> artistResponse = restTemplate.getForObject(artistApiUrl, Map.class);
                if (artistResponse != null && artistResponse.containsKey("data")) {
                    Map<String, Object> artistData = (Map<String, Object>) artistResponse.get("data");
                    if (artistData != null && artistData.containsKey("name")) {
                        artistNames.add(artistData.get("name").toString());
                    } else {
                        artistNames.add("Unknown Artist");
                    }
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

    // Xây dựng response cho bài hát, bao gồm thông tin từ API images
    private Map<String, Object> buildSongResponse(Song song) {
        Map<String, Object> songData = new HashMap<>();
        songData.put("id", song.getId());
        songData.put("title", song.getTitle());
        songData.put("artists", getArtistNames(song.getArtistIds()));
        songData.put("category", song.getCategory() != null ? song.getCategory() : "unknown");
        songData.put("image", getImageData(song.getIdImage()));
        return songData;
    }


    private Map<String, Object> getImageData(String imageId) {
        Map<String, Object> defaultResponse = new HashMap<>();
        defaultResponse.put("id", imageId != null ? imageId : "unknown");
        defaultResponse.put("url", "No image available");

        if (imageId == null || imageId.trim().isEmpty()) {
            return defaultResponse;
        }

        String imageApiUrl = "http://localhost:8080/api/images/" + imageId;
        try {
            Map<String, Object> imageData = restTemplate.getForObject(imageApiUrl, Map.class);
            if (imageData != null) {
                return imageData;
            } else {
                defaultResponse.put("url", "Unknown Image");
                return defaultResponse;
            }
        } catch (Exception e) {
            defaultResponse.put("url", "Error fetching image");
            return defaultResponse;
        }
    }

}


//package com.btec.webmusic_api.services;
//
//import com.btec.webmusic_api.entities.Audio;
//import com.btec.webmusic_api.entities.Song;
//import com.btec.webmusic_api.repositories.AudioRepository;
//import com.btec.webmusic_api.repositories.SongRepository;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.*;
//
//@Service
//public class SongService {
//
//    private final SongRepository songRepository;
//    private final AudioRepository audioRepository;
//    private final RestTemplate restTemplate;
//
////    @Value("${gemini.api.key}")
////    private String geminiApiKey;
////
////    @Value("${gemini.api.url}")
////    private String geminiApiUrl;
//
//    public SongService(SongRepository songRepository, AudioRepository audioRepository, RestTemplate restTemplate) {
//        this.songRepository = songRepository;
//        this.audioRepository = audioRepository;
//        this.restTemplate = restTemplate;
//    }
//
//    // Tạo bài hát mới
//    public Song createSong(Song song) {
//        validateSong(song);
//        Song savedSong = songRepository.save(song);
//
//        // Sau khi lưu bài hát, gọi Gemini để tạo mô tả tự động
//        String description = generateSongDescription(savedSong);
//        savedSong.setDescription(description);
//        return songRepository.save(savedSong);
//    }
//
//    // Lấy tất cả bài hát
//    public List<Map<String, Object>> getAllSongs() {
//        List<Song> songs = songRepository.findAll();
//        List<Map<String, Object>> response = new ArrayList<>();
//
//        for (Song song : songs) {
//            response.add(buildSongResponse(song));
//        }
//        return response;
//    }
//
//    // Lấy bài hát theo ID
//    public Optional<Map<String, Object>> getSongById(String id) {
//        Optional<Song> songOptional = songRepository.findById(id);
//        return songOptional.map(song -> {
//            Map<String, Object> songData = new HashMap<>();
//            songData.put("id", song.getId());
//            songData.put("title", song.getTitle() != null ? song.getTitle() : "Unknown Title");
//            songData.put("artists", getArtistNames(song.getArtistIds()));
//            songData.put("category", song.getCategory() != null ? song.getCategory() : "unknown");
//            songData.put("image", getImageData(song.getIdImage()));
//            songData.put("description", song.getDescription() != null ? song.getDescription() : "No description available");
//
//            // Phân tích tâm trạng từ category
//            String mood = analyzeSongMood(song.getCategory());
//            songData.put("mood", mood);
//
//            return songData;
//        });
//    }
//
//    // Cập nhật bài hát
//    public Optional<Song> updateSong(String id, Song updatedSong) {
//        Optional<Song> songOptional = songRepository.findById(id);
//        if (songOptional.isEmpty()) {
//            return Optional.empty();
//        }
//
//        Song song = songOptional.get();
//        song.setTitle(updatedSong.getTitle());
//        song.setArtistIds(updatedSong.getArtistIds());
//        song.setIdAudio(updatedSong.getIdAudio());
//        song.setIdImage(updatedSong.getIdImage());
//        song.setCategory(updatedSong.getCategory());
//
//        validateSong(song);
//
//        // Cập nhật mô tả tự động
//        String description = generateSongDescription(song);
//        song.setDescription(description);
//
//        return Optional.of(songRepository.save(song));
//    }
//
//    // Xóa bài hát
//    public boolean deleteSong(String id) {
//        if (!songRepository.existsById(id)) {
//            return false;
//        }
//        songRepository.deleteById(id);
//        return true;
//    }
//
//    // Lấy file MP3 và thông tin bài hát
//    public Optional<Map<String, Object>> getSongAudio(String songId) {
//        Optional<Song> songOptional = songRepository.findById(songId);
//        if (songOptional.isEmpty()) {
//            return Optional.empty();
//        }
//
//        Song song = songOptional.get();
//        Optional<Audio> audioOptional = audioRepository.findById(song.getIdAudio());
//        if (audioOptional.isEmpty()) {
//            return Optional.empty();
//        }
//
//        Audio audio = audioOptional.get();
//        Map<String, Object> audioData = new HashMap<>();
//        audioData.put("mp3Data", audio.getData());
//        audioData.put("duration", audio.getDuration());
//        audioData.put("fileName", audio.getFileName());
//        audioData.put("title", song.getTitle() != null ? song.getTitle() : "Unknown Title");
//        audioData.put("category", song.getCategory() != null ? song.getCategory() : "Unknown Category");
//        audioData.put("artist", String.join(", ", getArtistNames(song.getArtistIds())));
//        audioData.put("image", getImageData(song.getIdImage())); // Thêm thông tin image
//
//        return Optional.of(audioData);
//    }
//
//    private void validateSong(Song song) {
//        if (song.getTitle() == null || song.getTitle().trim().isEmpty()) {
//            throw new IllegalArgumentException("Title cannot be empty.");
//        }
//        if (song.getArtistIds() == null || song.getArtistIds().isEmpty()) {
//            throw new IllegalArgumentException("At least one artist is required.");
//        }
//        if (song.getIdAudio() == null || song.getIdAudio().trim().isEmpty()) {
//            throw new IllegalArgumentException("Audio ID cannot be empty.");
//        }
//        if (song.getIdImage() == null || song.getIdImage().trim().isEmpty()) {
//            throw new IllegalArgumentException("Image ID cannot be empty.");
//        }
//        if (song.getCategory() == null || song.getCategory().trim().isEmpty()) {
//            throw new IllegalArgumentException("Category cannot be empty.");
//        }
//    }
//
//    // Lấy danh sách tên nghệ sĩ từ API Artist
//    private List<String> getArtistNames(List<String> artistIds) {
//        List<String> artistNames = new ArrayList<>();
//        if (artistIds == null || artistIds.isEmpty()) {
//            return List.of("Unknown Artist");
//        }
//
//        for (String artistId : artistIds) {
//            String artistApiUrl = "http://localhost:8080/api/artists/" + artistId;
//            try {
//                Map<String, Object> artistResponse = restTemplate.getForObject(artistApiUrl, Map.class);
//                if (artistResponse != null && artistResponse.containsKey("data")) {
//                    Map<String, Object> artistData = (Map<String, Object>) artistResponse.get("data");
//                    if (artistData != null && artistData.containsKey("name")) {
//                        artistNames.add(artistData.get("name").toString());
//                    } else {
//                        artistNames.add("Unknown Artist");
//                    }
//                } else {
//                    artistNames.add("Unknown Artist");
//                }
//            } catch (Exception e) {
//                System.err.println("Error fetching artist with ID " + artistId + ": " + e.getMessage());
//                artistNames.add("Unknown Artist");
//            }
//        }
//        return artistNames;
//    }
//
//    // Xây dựng response cho bài hát, bao gồm thông tin từ API images
//    private Map<String, Object> buildSongResponse(Song song) {
//        Map<String, Object> songData = new HashMap<>();
//        songData.put("id", song.getId());
//        songData.put("title", song.getTitle() != null ? song.getTitle() : "Unknown Title");
//        songData.put("artists", getArtistNames(song.getArtistIds()));
//        songData.put("category", song.getCategory() != null ? song.getCategory() : "unknown");
//        songData.put("image", getImageData(song.getIdImage()));
//        songData.put("description", song.getDescription() != null ? song.getDescription() : "No description available");
//
//        // Phân tích tâm trạng từ category
//        String mood = analyzeSongMood(song.getCategory());
//        songData.put("mood", mood);
//
//        return songData;
//    }
//
//    private Map<String, Object> getImageData(String imageId) {
//        Map<String, Object> defaultResponse = new HashMap<>();
//        defaultResponse.put("id", imageId != null ? imageId : "unknown");
//        defaultResponse.put("url", "No image available");
//
//        if (imageId == null || imageId.trim().isEmpty()) {
//            return defaultResponse;
//        }
//
//        String imageApiUrl = "http://localhost:8080/api/images/" + imageId;
//        try {
//            Map<String, Object> imageData = restTemplate.getForObject(imageApiUrl, Map.class);
//            if (imageData != null) {
//                return imageData;
//            } else {
//                defaultResponse.put("url", "Unknown Image");
//                return defaultResponse;
//            }
//        } catch (Exception e) {
//            defaultResponse.put("url", "Error fetching image");
//            return defaultResponse;
//        }
//    }
//
//    // Sử dụng Gemini API để phân tích tâm trạng từ category
//    private String analyzeSongMood(String category) {
//        try {
//            String url = geminiApiUrl + "?key=" + geminiApiKey;
//
//            Map<String, Object> requestBody = new HashMap<>();
//            Map<String, Object> content = new HashMap<>();
//            content.put("parts", List.of(Map.of("text", "Analyze the mood of a song in the " + (category != null ? category : "unknown") + " category and return a single word (e.g., happy, sad, relaxed):")));
//            requestBody.put("contents", List.of(content));
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.set("Content-Type", "application/json");
//
//            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
//            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
//
//            Map<String, Object> responseBody = response.getBody();
//            if (responseBody != null && responseBody.containsKey("candidates")) {
//                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
//                if (!candidates.isEmpty()) {
//                    Map<String, Object> candidate = candidates.get(0);
//                    Map<String, Object> contentResponse = (Map<String, Object>) candidate.get("content");
//                    List<Map<String, String>> parts = (List<Map<String, String>>) contentResponse.get("parts");
//                    return parts.get(0).get("text");
//                }
//            }
//            return "unknown";
//        } catch (Exception e) {
//            System.err.println("Error analyzing song mood with Gemini API: " + e.getMessage());
//            return "unknown";
//        }
//    }
//
//    // Sử dụng Gemini API để tạo mô tả tự động cho bài hát
//    private String generateSongDescription(Song song) {
//        try {
//            String prompt = String.format("Generate a short description for a song titled '%s' by %s in the %s category.",
//                    song.getTitle() != null ? song.getTitle() : "Unknown Title",
//                    String.join(", ", getArtistNames(song.getArtistIds())),
//                    song.getCategory() != null ? song.getCategory() : "unknown");
//
//            String url = geminiApiUrl + "?key=" + geminiApiKey;
//
//            Map<String, Object> requestBody = new HashMap<>();
//            Map<String, Object> content = new HashMap<>();
//            content.put("parts", List.of(Map.of("text", prompt)));
//            requestBody.put("contents", List.of(content));
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.set("Content-Type", "application/json");
//
//            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
//            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
//
//            Map<String, Object> responseBody = response.getBody();
//            if (responseBody != null && responseBody.containsKey("candidates")) {
//                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
//                if (!candidates.isEmpty()) {
//                    Map<String, Object> candidate = candidates.get(0);
//                    Map<String, Object> contentResponse = (Map<String, Object>) candidate.get("content");
//                    List<Map<String, String>> parts = (List<Map<String, String>>) contentResponse.get("parts");
//                    return parts.get(0).get("text");
//                }
//            }
//            return "No description available";
//        } catch (Exception e) {
//            System.err.println("Error generating description with Gemini API: " + e.getMessage());
//            return "No description available";
//        }
//    }
//}