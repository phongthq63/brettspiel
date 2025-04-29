package com.brettspiel.boardgameguide.game.repository;

import com.brettspiel.boardgameguide.game.entity.GamePlayTime;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomGamePlayTimeRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:48 PM
 */
public interface IGamePlayTimeRepository extends MongoRepository<GamePlayTime, ObjectId>, ICustomGamePlayTimeRepository {
}
