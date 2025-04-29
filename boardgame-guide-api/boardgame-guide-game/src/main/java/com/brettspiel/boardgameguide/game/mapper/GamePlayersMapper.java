package com.brettspiel.boardgameguide.game.mapper;

import com.brettspiel.boardgameguide.game.dto.GamePlayersDTO;
import com.brettspiel.boardgameguide.game.entity.GamePlayers;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:51 PM
 */
@Mapper(componentModel = "spring")
public interface GamePlayersMapper {

    @Mapping(target = "id", source = "playersId")
    GamePlayersDTO toGamePlayersDTO(GamePlayers gamePlayers);

}
