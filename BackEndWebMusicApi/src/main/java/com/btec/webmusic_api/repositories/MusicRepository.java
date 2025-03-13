package com.btec.webmusic_api.repositories;

import com.btec.webmusic_api.entities.Music;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MusicRepository extends MongoRepository<Music, String> {
    List<Music> findByPlaylistId(String playlistId);
}
