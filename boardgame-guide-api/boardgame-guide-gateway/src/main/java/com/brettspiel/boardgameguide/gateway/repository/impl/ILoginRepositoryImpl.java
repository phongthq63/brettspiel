package com.brettspiel.boardgameguide.gateway.repository.impl;

import com.brettspiel.boardgameguide.gateway.entity.Login;
import com.brettspiel.boardgameguide.gateway.repository.custom.ICustomLoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:33 AM
 */
@Repository
@RequiredArgsConstructor
public class ILoginRepositoryImpl implements ICustomLoginRepository {

    private final MongoTemplate mongoTemplate;


    @Override
    public Login findByRefreshToken(String refreshToken) {
        Query query = Query.query(Criteria.where("refresh_token").is(refreshToken));

        return mongoTemplate.findOne(query, Login.class);
    }

}
