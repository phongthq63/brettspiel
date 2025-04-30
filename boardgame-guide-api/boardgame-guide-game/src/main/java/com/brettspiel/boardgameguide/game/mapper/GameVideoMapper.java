package com.brettspiel.boardgameguide.game.mapper;

import com.brettspiel.boardgameguide.game.dto.GameVideoDTO;
import com.brettspiel.boardgameguide.game.entity.GameVideo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created by Quach Thanh Phong
 * On 4/30/2025 - 5:04 PM
 */
@Mapper(componentModel = "spring")
public interface GameVideoMapper {

    @Mapping(target = "id", source = "videoId")
    GameVideoDTO toGameVideoDTO(GameVideo gameVideo);

}
