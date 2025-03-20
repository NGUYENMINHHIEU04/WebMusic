package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Album;
import com.btec.webmusic_api.repositories.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlbumService {
    @Autowired
    private AlbumRepository albumRepository;

    // Tạo album mới
    public Album createAlbum(Album album) {
        return albumRepository.save(album);
    }

    // Lấy danh sách tất cả album
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    // Lấy album theo ID
    public Optional<Album> getAlbumById(String id) {
        return albumRepository.findById(id);
    }

    // Cập nhật album
    public Album updateAlbum(String id, Album albumDetails) {
        return albumRepository.findById(id).map(album -> {
            album.setTitle(albumDetails.getTitle());  // Đổi albumName -> title
            album.setArtist(albumDetails.getArtist());
            album.setReleaseDate(albumDetails.getReleaseDate());
            album.setCoverImageUrl(albumDetails.getCoverImageUrl());  // Đổi coverImage -> coverImageUrl
            album.setSongIds(albumDetails.getSongIds());
            return albumRepository.save(album);
        }).orElseThrow(() -> new RuntimeException("Album not found!"));
    }

    // Xóa album
    public void deleteAlbum(String id) {
        albumRepository.deleteById(id);
    }
}
