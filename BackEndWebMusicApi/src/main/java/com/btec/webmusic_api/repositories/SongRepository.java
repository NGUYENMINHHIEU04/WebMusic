package com.btec.webmusic_api.repositories;

import com.btec.webmusic_api.entities.Song;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SongRepository extends MongoRepository<Song, String> {
    List<Song> findByAlbumId(String albumId);
}
