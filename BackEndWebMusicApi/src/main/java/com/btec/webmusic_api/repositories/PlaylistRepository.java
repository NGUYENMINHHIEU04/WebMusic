package com.btec.webmusic_api.repositories;

import com.btec.webmusic_api.entities.Playlist;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlaylistRepository extends MongoRepository<Playlist, String> {
}
