package com.brettspiel.boardgameguide.game.repository.impl;

import com.brettspiel.boardgameguide.game.entity.User;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 3:49 PM
 */
@Repository
@RequiredArgsConstructor
public class IUserRepositoryImpl implements ICustomUserRepository {

    private final MongoTemplate mongoTemplate;


    @Override
    public User findById(String id) {
        Query query = Query.query(Criteria.where("user_id").is(id));

        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public List<User> findByIds(List<String> ids) {
        Query query = Query.query(Criteria.where("user_id").in(ids));

        return mongoTemplate.find(query, User.class);
    }
}
