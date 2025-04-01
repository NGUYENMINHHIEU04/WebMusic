package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.configs.StaticDomain;
import com.btec.webmusic_api.dtos.ResponseObject;
import com.btec.webmusic_api.entities.Library;
import com.btec.webmusic_api.entities.PlaylistCard;
import com.btec.webmusic_api.services.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {StaticDomain.IP + ":3000",
        StaticDomain.IP + ":3001",
        "http://localhost:3000",
        "http://localhost:3001"})
@RestController
@RequestMapping("/api/library")
public class LibraryController {

    private final LibraryService libraryService;

    @Autowired
    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @PostMapping("/add")
    public ResponseEntity<ResponseObject<String>> addPlaylistCard(@RequestBody Library.LibraryRequest request) {
        try {
            libraryService.addPlaylistCardToLibrary(request.getUserId(), request.getPlaylistCardId());
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, request.getPlaylistCardId(),
                            "PlaylistCard added to library successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject<>(500, null, "Internal server error: " + e.getMessage()));
        }
    }
    // Xóa PlaylistCard khỏi thư viện
    @PostMapping("/remove")
    public ResponseEntity<ResponseObject<String>> removePlaylistCard(
            @RequestParam("userId") String userId,
            @RequestParam("playlistCardId") String playlistCardId) {
        try {
            libraryService.removePlaylistCardFromLibrary(userId, playlistCardId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, playlistCardId,
                            "PlaylistCard removed from library successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject<>(500, null, "Internal server error: " + e.getMessage()));
        }
    }

    // Lấy danh sách PlaylistCard trong thư viện
    @GetMapping("/{userId}")
    public ResponseEntity<ResponseObject<List<PlaylistCard>>> getLibrary(
            @PathVariable("userId") String userId) {
        try {
            List<PlaylistCard> playlistCards = libraryService.getLikedPlaylistCards(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, playlistCards,
                            "Retrieved " + playlistCards.size() + " PlaylistCards from library"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject<>(500, null, "Internal server error: " + e.getMessage()));
        }
    }
}