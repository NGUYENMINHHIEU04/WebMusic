package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Library;
import com.btec.webmusic_api.entities.PlaylistCard;
import com.btec.webmusic_api.repositories.LibraryRepository;
import com.btec.webmusic_api.repositories.PlaylistCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibraryService {

    private final LibraryRepository libraryRepository;
    private final PlaylistCardRepository playlistCardRepository;

    @Autowired
    public LibraryService(LibraryRepository libraryRepository, PlaylistCardRepository playlistCardRepository) {
        this.libraryRepository = libraryRepository;
        this.playlistCardRepository = playlistCardRepository;
    }

    // Lấy hoặc tạo mới Library cho người dùng
    private Library getOrCreateLibrary(String userId) {
        Optional<Library> libraryOpt = libraryRepository.findByUserId(userId);
        if (libraryOpt.isPresent()) {
            return libraryOpt.get();
        }
        Library newLibrary = new Library(userId);
        return libraryRepository.save(newLibrary);
    }

    // Thêm PlaylistCard vào thư viện
    public void addPlaylistCardToLibrary(String userId, String playlistCardId) {
        if (userId == null || userId.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be empty");
        }
        if (playlistCardId == null || playlistCardId.trim().isEmpty()) {
            throw new IllegalArgumentException("PlaylistCard ID cannot be empty");
        }

        Optional<PlaylistCard> playlistCardOpt = playlistCardRepository.findById(playlistCardId);
        if (!playlistCardOpt.isPresent()) {
            throw new IllegalArgumentException("PlaylistCard with ID " + playlistCardId + " not found");
        }

        Library library = getOrCreateLibrary(userId);
        library.addPlaylistCard(playlistCardId);
        libraryRepository.save(library);
    }

    // Xóa PlaylistCard khỏi thư viện
    public void removePlaylistCardFromLibrary(String userId, String playlistCardId) {
        if (userId == null || userId.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be empty");
        }
        if (playlistCardId == null || playlistCardId.trim().isEmpty()) {
            throw new IllegalArgumentException("PlaylistCard ID cannot be empty");
        }

        Optional<Library> libraryOpt = libraryRepository.findByUserId(userId);
        if (!libraryOpt.isPresent()) {
            throw new IllegalArgumentException("Library for user " + userId + " not found");
        }

        Library library = libraryOpt.get();
        if (!library.getPlaylistCardIds().contains(playlistCardId)) {
            throw new IllegalArgumentException("PlaylistCard with ID " + playlistCardId + " not found in library");
        }

        library.removePlaylistCard(playlistCardId);
        libraryRepository.save(library);
    }

    // Lấy danh sách PlaylistCard trong thư viện
    public List<PlaylistCard> getLikedPlaylistCards(String userId) {
        if (userId == null || userId.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be empty");
        }

        Library library = getOrCreateLibrary(userId);
        List<String> playlistCardIds = library.getPlaylistCardIds();
        return playlistCardRepository.findAllById(playlistCardIds);
    }
}