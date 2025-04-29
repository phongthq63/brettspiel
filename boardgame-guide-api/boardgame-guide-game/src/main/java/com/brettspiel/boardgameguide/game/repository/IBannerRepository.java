package com.brettspiel.boardgameguide.game.repository;

import com.brettspiel.boardgameguide.game.entity.Banner;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomBannerRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 5:15 PM
 */
public interface IBannerRepository extends MongoRepository<Banner, ObjectId>, ICustomBannerRepository {
}
