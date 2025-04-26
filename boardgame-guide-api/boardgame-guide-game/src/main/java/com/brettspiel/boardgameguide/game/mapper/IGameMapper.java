package com.brettspiel.boardgameguide.game.mapper;

import com.brettspiel.boardgameguide.game.dto.FeaturedGameDTO;
import com.brettspiel.boardgameguide.game.entity.FeaturedGame;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 10:14 AM
 */
@Mapper(componentModel = "spring")
public interface IGameMapper {

    @Mapping(target = "id", source = "gameId")
    FeaturedGameDTO toFeaturedGameDTO(FeaturedGame featuredGame);

}
