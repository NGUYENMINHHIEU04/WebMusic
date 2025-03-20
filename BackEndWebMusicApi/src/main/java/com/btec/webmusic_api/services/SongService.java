package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.repositories.SongRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.data.mongodb.gridfs.GridFsResource;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class SongService {
    @Autowired
    private SongRepository songRepository;

    @Autowired
    private GridFsTemplate gridFsTemplate;

    /**
     * Upload bài hát vào MongoDB GridFS và lưu thông tin vào database
     */
    public Song uploadSong(MultipartFile file, String title, String artist, String albumId, String genre, String coverImage) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File nhạc không được để trống");
        }

        // Lưu file nhạc vào GridFS
        ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());

        // Tạo bài hát mới
        Song song = new Song();
        song.setTitle(title);
        song.setArtist(artist);
        song.setAlbumId(albumId);
        song.setGenre(genre);
        song.setCoverImageUrl(coverImage);
        song.setFileUrl(fileId.toHexString());

        return songRepository.save(song);
    }
    public List<Song> getSongsByAlbum(String albumId) {
        return songRepository.findByAlbumId(albumId);
    }

    public Song createSong(Song song) {
        return songRepository.save(song);
    }

    public List<Song> createSongs(List<Song> songs) {
        return songRepository.saveAll(songs);
    }

    /**
     * Lấy danh sách tất cả bài hát
     */
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    /**
     * Lấy bài hát theo ID
     */
    public Optional<Song> getSongById(String id) {
        return songRepository.findById(id);
    }



    /**
     * Xóa bài hát theo ID và xóa file trong GridFS
     */
//    public void deleteSong(String id) {
//        Optional<Song> songOptional = songRepository.findById(id);
//        if (songOptional.isPresent()) {
//            Song song = songOptional.get();
//
//            // Xóa file nhạc khỏi GridFS nếu tồn tại
//            if (song.getFileUrl() != null) {
//                Query query = Query.query(Criteria.where("_id").is(song.getFileUrl()));
//                gridFsTemplate.delete(query);
//            }
//
//            // Xóa bài hát khỏi database
//            songRepository.deleteById(id);
//        } else {
//            throw new RuntimeException("Bài hát không tồn tại!");
//        }
//    }

    public boolean deleteSong(String id) {
        Optional<Song> song = songRepository.findById(id);
        if (song.isPresent()) {
            songRepository.deleteById(id);
            return true; // Trả về true nếu xóa thành công
        }
        return false; // Trả về false nếu không tìm thấy bài hát
    }

    /**
     * Lấy dữ liệu file nhạc từ GridFS theo fileId
     */
    public byte[] getSongFile(String fileId) throws IOException {
        Query query = Query.query(Criteria.where("_id").is(fileId));
        GridFSFile gridFSFile = gridFsTemplate.findOne(query);

        if (gridFSFile != null) {
            GridFsResource resource = gridFsTemplate.getResource(gridFSFile);
            return resource.getInputStream().readAllBytes();
        }
        return null;
    }


    public String uploadSongFile(MultipartFile file, String title, String artist, String albumId, String genre, String coverImage) throws IOException {
        // Lưu file vào GridFS
        ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());

        // Trả về ID của file đã lưu
        return fileId.toHexString();
    }
}
