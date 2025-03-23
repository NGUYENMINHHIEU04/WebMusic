package com.btec.webmusic_api.repositories;


import com.btec.webmusic_api.entities.Playlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PlaylistRepository extends MongoRepository<Playlist, String> {
    List<Playlist> findByGenre(String genre);
}