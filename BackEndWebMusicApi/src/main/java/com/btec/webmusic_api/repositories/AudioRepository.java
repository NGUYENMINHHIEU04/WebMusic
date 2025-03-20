package com.btec.webmusic_api.repositories;

import com.btec.webmusic_api.entities.Audio;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AudioRepository extends MongoRepository<Audio, String> {
}