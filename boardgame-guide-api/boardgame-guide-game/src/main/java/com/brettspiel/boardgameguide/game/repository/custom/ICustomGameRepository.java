package com.brettspiel.boardgameguide.game.repository.custom;

import com.brettspiel.boardgameguide.game.entity.Game;

import java.util.List;
import java.util.Set;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 7:12 PM
 */
public interface ICustomGameRepository {

    List<Game> findList(List<Integer[]> players, List<Integer[]> playTimes, Set<String> genreIds, String sortBy, Integer page, Integer size);

    long count(List<Integer[]> players, List<Integer[]> playTimes, Set<String> genreIds);

}
