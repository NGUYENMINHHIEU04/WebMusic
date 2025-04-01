package com.btec.webmusic_api.repositories;

import com.btec.webmusic_api.entities.PlaylistCard;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlaylistCardRepository extends MongoRepository<PlaylistCard, String> {
}
