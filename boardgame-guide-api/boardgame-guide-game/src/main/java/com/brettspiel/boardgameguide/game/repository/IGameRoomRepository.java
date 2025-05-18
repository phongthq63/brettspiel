package com.brettspiel.boardgameguide.game.repository;

import com.brettspiel.boardgameguide.game.entity.GameRoom;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomGameRoomRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 5/15/2025 - 3:47 PM
 */
public interface IGameRoomRepository extends MongoRepository<GameRoom, ObjectId>, ICustomGameRoomRepository {
}
