package com.brettspiel.boardgameguide.game.repository.impl;

import com.brettspiel.boardgameguide.game.entity.FeaturedGame;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomFeaturedGameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.domain.Sort;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/25/2025 - 6:39 PM
 */
@Repository
@RequiredArgsConstructor
public class IFeaturedGameRepositoryImpl implements ICustomFeaturedGameRepository {

    private final MongoTemplate mongoTemplate;



    @Override
    public List<FeaturedGame> findList(int size) {
        Query query = new Query();
        if (size > 0) {
            query.limit(size);
        }
        return mongoTemplate.find(query, FeaturedGame.class);
    }

    @Override
    public List<FeaturedGame> findList(String sortBy, int size) {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC, sortBy));
        if (size > 0) {
            query.limit(size);
        }
        return mongoTemplate.find(query, FeaturedGame.class);
    }
}
