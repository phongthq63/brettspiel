package com.brettspiel.boardgameguide.gateway.repository;

import com.brettspiel.boardgameguide.gateway.entity.Account;
import com.brettspiel.boardgameguide.gateway.repository.custom.ICustomAccountRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:36 AM
 */
public interface IAccountRepository extends MongoRepository<Account, ObjectId>, ICustomAccountRepository {
}
