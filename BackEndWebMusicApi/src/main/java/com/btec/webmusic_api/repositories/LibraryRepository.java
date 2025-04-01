package com.btec.webmusic_api.repositories;

import com.btec.webmusic_api.entities.Library;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LibraryRepository extends MongoRepository<Library, String> {
    Optional<Library> findByUserId(String userId); // Tìm thư viện theo userId
}