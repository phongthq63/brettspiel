package com.brettspiel.boardgameguide.game.repository;

import com.brettspiel.boardgameguide.game.entity.Game;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomGameRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 7:11 PM
 */
public interface IGameRepository extends MongoRepository<Game, ObjectId>, ICustomGameRepository {
}
