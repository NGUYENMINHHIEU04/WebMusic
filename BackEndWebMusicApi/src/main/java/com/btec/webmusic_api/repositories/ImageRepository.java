package com.btec.webmusic_api.repositories;



import com.btec.webmusic_api.entities.Image;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ImageRepository extends MongoRepository<Image, String> {


}
