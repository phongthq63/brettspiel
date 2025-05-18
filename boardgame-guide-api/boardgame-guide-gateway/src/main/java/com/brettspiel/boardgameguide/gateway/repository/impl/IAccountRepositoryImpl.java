package com.brettspiel.boardgameguide.gateway.repository.impl;

import com.brettspiel.boardgameguide.gateway.entity.Account;
import com.brettspiel.boardgameguide.gateway.repository.custom.ICustomAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:37 AM
 */
@Repository
@RequiredArgsConstructor
public class IAccountRepositoryImpl implements ICustomAccountRepository {

    private final MongoTemplate mongoTemplate;


    @Override
    public Account findByUsernameAndPassword(String username, String password) {
        Query query = Query.query(Criteria
                .where("username").is(username)
                .and("password").is(password));

        return mongoTemplate.findOne(query, Account.class);
    }

    @Override
    public Account findByEmail(String email) {
        Query query = Query.query(Criteria.where("email").is(email));

        return mongoTemplate.findOne(query, Account.class);
    }
}
