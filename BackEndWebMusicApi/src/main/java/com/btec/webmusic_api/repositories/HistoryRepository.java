package com.btec.webmusic_api.repositories;

import com.btec.webmusic_api.entities.History;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface HistoryRepository extends MongoRepository<History, String> {
    // Tìm lịch sử nghe nhạc theo userId
    List<History> findByUserId(String userId);

    // Tìm lịch sử nghe nhạc theo userId và songId
    History findByUserIdAndSongId(String userId, String songId);
}