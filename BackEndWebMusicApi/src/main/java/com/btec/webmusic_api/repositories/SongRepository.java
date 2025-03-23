package com.btec.webmusic_api.repositories;

import com.btec.webmusic_api.entities.Song;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SongRepository extends MongoRepository<Song, String> {
}