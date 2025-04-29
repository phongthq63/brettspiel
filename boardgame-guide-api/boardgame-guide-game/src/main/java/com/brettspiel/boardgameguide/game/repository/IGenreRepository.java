package com.brettspiel.boardgameguide.game.repository;

import com.brettspiel.boardgameguide.game.entity.Genre;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomGenreRepository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 4:36 PM
 */
public interface IGenreRepository extends MongoRepository<Genre, ObjectId>, ICustomGenreRepository {
}
