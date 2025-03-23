package com.btec.webmusic_api.repositories;

import com.btec.webmusic_api.entities.Album;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlbumRepository extends MongoRepository<Album, String> {

}