package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.api_recommendation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private api_recommendation recommendationApi;

    @GetMapping
    public List<Map<String, Object>> getRecommendations(@RequestParam String userId) {
        return recommendationApi.getRecommendations(userId);
    }
}