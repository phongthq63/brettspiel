package com.brettspiel.boardgameguide.game.repository.custom;

import com.brettspiel.boardgameguide.game.entity.GamePlayers;

import java.util.List;
import java.util.Set;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:46 PM
 */
public interface ICustomGamePlayersRepository {

    List<GamePlayers> findList(Set<String> ids);

}
