package com.btec.webmusic_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Component
public class api_recommendation {

    private final RestTemplate restTemplate;

    @Autowired
    public api_recommendation(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Map<String, Object>> getRecommendations(String userId) {
        String url = "http://localhost:5001/recommend?user_id=" + userId;
        ResponseEntity<List> response = restTemplate.getForEntity(url, List.class);
        return response.getBody();
    }
}
