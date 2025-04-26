package com.brettspiel.boardgameguide.game.repository;

import com.brettspiel.boardgameguide.game.entity.FeaturedGame;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomFeaturedGameRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 4/25/2025 - 6:38 PM
 */
public interface IFeaturedGameRepository extends MongoRepository<FeaturedGame, ObjectId>, ICustomFeaturedGameRepository {
}
