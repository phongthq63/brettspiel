package com.brettspiel.boardgameguide.splendor.repository;

import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import com.brettspiel.boardgameguide.splendor.repository.custom.ICustomSplendorGameRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 11/13/2024 - 5:16 PM
 */
public interface ISplendorGameRepository extends MongoRepository<SplendorGame, ObjectId>, ICustomSplendorGameRepository {
}
