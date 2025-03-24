package com.btec.webmusic_api.repositories;

import com.btec.webmusic_api.entities.Artist;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArtistRepository extends MongoRepository<Artist, String> {
}
