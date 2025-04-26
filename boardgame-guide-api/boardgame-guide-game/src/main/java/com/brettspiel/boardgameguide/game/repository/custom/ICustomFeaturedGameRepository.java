package com.brettspiel.boardgameguide.game.repository.custom;

import com.brettspiel.boardgameguide.game.entity.FeaturedGame;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/25/2025 - 6:39 PM
 */
public interface ICustomFeaturedGameRepository {

    List<FeaturedGame> findList(int size);

    List<FeaturedGame> findList(String sortBy, int size);

}
