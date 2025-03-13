package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Music;
import com.btec.webmusic_api.repositories.MusicRepository;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class MusicService {

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private GridFSBucket gridFSBucket; // GridFS để lưu file MP3

    // Lấy tất cả bài hát
    public List<Music> getAllMusic() {
        return musicRepository.findAll();
    }

    // Lấy bài hát theo ID
    public Optional<Music> getMusicById(String id) {
        return musicRepository.findById(id);
    }

    // Lấy danh sách bài hát theo Playlist
    public List<Music> getMusicByPlaylistId(String playlistId) {
        return musicRepository.findByPlaylistId(playlistId);
    }

    // Thêm bài hát mới với file MP3
    public Music createMusic(Music music, MultipartFile audioFile) throws IOException {
        ObjectId fileId = gridFSBucket.uploadFromStream(audioFile.getOriginalFilename(), audioFile.getInputStream());
        music.setAudioFileId(fileId.toHexString()); // Lưu ID của file trong GridFS
        return musicRepository.save(music);
    }

    // Xóa bài hát và file MP3
    public void deleteMusic(String id) {
        musicRepository.findById(id).ifPresent(music -> {
            gridFSBucket.delete(new ObjectId(music.getAudioFileId())); // Xóa file MP3
            musicRepository.deleteById(id);
        });
    }
}
