package com.brettspiel.boardgameguide.game.repository.impl;

import com.brettspiel.boardgameguide.game.entity.GameRoom;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomGameRoomRepository;
import com.brettspiel.utils.IdGenerator;
import com.mongodb.client.result.UpdateResult;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

/**
 * Created by Quach Thanh Phong
 * On 5/15/2025 - 3:48 PM
 */
@Repository
@RequiredArgsConstructor
public class IGameRoomRepositoryImpl implements ICustomGameRoomRepository {

    private final MongoTemplate mongoTemplate;



    @Override
    public GameRoom findById(String id) {
        Query query = Query.query(Criteria.where("room_id").is(id));

        return mongoTemplate.findOne(query, GameRoom.class);
    }

    @Override
    public GameRoom findOwnerRoomInit(String userId, String sessionId, String gameId) {
        Query query = Query.query(Criteria.where("host_id").is(userId)
                .and("session_id").is(sessionId)
                .and("game_id").is(gameId)
                .and("status").is(GameRoom.Status.INIT));
        String id = IdGenerator.nextObjectId();
        Update update = new Update();
        update.setOnInsert("room_id", id);
        update.setOnInsert("session_id", sessionId);
        update.setOnInsert("game_id", gameId);
        update.setOnInsert("status", GameRoom.Status.INIT);
        update.setOnInsert("host_id", userId);

        UpdateResult result = mongoTemplate.upsert(query, update, GameRoom.class);
        if (result.getUpsertedId() != null) {
            return GameRoom.builder()
                    .roomId(id)
                    .sessionId(sessionId)
                    .gameId(gameId)
                    .status(GameRoom.Status.INIT)
                    .hostId(userId)
                    .build();
        } else {
            return mongoTemplate.findOne(query, GameRoom.class);
        }
    }
}
