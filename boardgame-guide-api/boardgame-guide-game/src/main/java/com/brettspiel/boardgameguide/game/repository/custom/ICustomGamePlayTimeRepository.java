package com.brettspiel.boardgameguide.game.repository.custom;

import com.brettspiel.boardgameguide.game.entity.GamePlayTime;

import java.util.List;
import java.util.Set;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:48 PM
 */
public interface ICustomGamePlayTimeRepository {

    List<GamePlayTime> findList(Set<String> ids);

}
