package com.brettspiel.boardgameguide.game.repository;

import com.brettspiel.boardgameguide.game.entity.User;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomUserRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 3:48 PM
 */
public interface IUserRepository extends MongoRepository<User, ObjectId>, ICustomUserRepository {
}
