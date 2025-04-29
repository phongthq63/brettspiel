package com.brettspiel.boardgameguide.game.mapper;

import com.brettspiel.boardgameguide.game.dto.GamePlayTimeDTO;
import com.brettspiel.boardgameguide.game.entity.GamePlayTime;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:53 PM
 */
@Mapper(componentModel = "spring")
public interface GamePlayTimeMapper {

    @Mapping(target = "id", source = "playTimeId")
    GamePlayTimeDTO toGamePlayTimeDTO(GamePlayTime gamePlayTime);

}
