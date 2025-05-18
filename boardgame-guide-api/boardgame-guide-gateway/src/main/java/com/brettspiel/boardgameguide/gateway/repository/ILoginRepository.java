package com.brettspiel.boardgameguide.gateway.repository;

import com.brettspiel.boardgameguide.gateway.entity.Login;
import com.brettspiel.boardgameguide.gateway.repository.custom.ICustomLoginRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:32 AM
 */
public interface ILoginRepository extends MongoRepository<Login, ObjectId>, ICustomLoginRepository {
}
