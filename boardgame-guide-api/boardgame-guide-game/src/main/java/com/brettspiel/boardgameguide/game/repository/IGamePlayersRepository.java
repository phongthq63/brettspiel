package com.brettspiel.boardgameguide.game.repository;

import com.brettspiel.boardgameguide.game.entity.GamePlayers;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomGamePlayersRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:45 PM
 */
public interface IGamePlayersRepository extends MongoRepository<GamePlayers, ObjectId>, ICustomGamePlayersRepository {
}
