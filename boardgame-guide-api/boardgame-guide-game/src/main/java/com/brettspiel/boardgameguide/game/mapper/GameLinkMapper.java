package com.brettspiel.boardgameguide.game.mapper;

import com.brettspiel.boardgameguide.game.dto.GameLinkDTO;
import com.brettspiel.boardgameguide.game.entity.GameLink;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created by Quach Thanh Phong
 * On 5/11/2025 - 2:56 PM
 */
@Mapper(componentModel = "spring")
public interface GameLinkMapper {

    @Mapping(target = "id", source = "linkId")
    GameLinkDTO toGameLinkDTO(GameLink gameLink);

}
