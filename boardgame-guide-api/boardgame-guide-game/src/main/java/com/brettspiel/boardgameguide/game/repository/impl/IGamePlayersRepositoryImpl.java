package com.brettspiel.boardgameguide.game.repository.impl;

import com.brettspiel.boardgameguide.game.entity.GamePlayers;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomGamePlayersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:46 PM
 */
@Repository
@RequiredArgsConstructor
public class IGamePlayersRepositoryImpl implements ICustomGamePlayersRepository {

    private final MongoTemplate mongoTemplate;



    @Override
    public List<GamePlayers> findList(Set<String> ids) {
        Query query = Query.query(Criteria.where("players_id").in(ids));

        return mongoTemplate.find(query, GamePlayers.class);
    }
}
