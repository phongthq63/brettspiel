package com.brettspiel.boardgameguide.splendor.repository;

import com.brettspiel.boardgameguide.splendor.entity.SplendorTable;
import com.brettspiel.boardgameguide.splendor.repository.custom.ICustomSplendorTableRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 11/17/2024 - 5:44 PM
 */
public interface ISplendorTableRepository extends MongoRepository<SplendorTable, ObjectId>, ICustomSplendorTableRepository {
}
