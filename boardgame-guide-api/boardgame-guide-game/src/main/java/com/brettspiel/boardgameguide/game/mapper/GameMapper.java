package com.brettspiel.boardgameguide.game.mapper;

import com.brettspiel.boardgameguide.game.dto.FeaturedGameDTO;
import com.brettspiel.boardgameguide.game.dto.GameDTO;
import com.brettspiel.boardgameguide.game.dto.GameDetailDTO;
import com.brettspiel.boardgameguide.game.entity.FeaturedGame;
import com.brettspiel.boardgameguide.game.entity.Game;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 10:14 AM
 */
@Mapper(componentModel = "spring", uses = {GenreMapper.class, GameRuleMapper.class, GameVideoMapper.class})
public interface GameMapper {

    @Mapping(target = "id", source = "gameId")
    FeaturedGameDTO toFeaturedGameDTO(FeaturedGame featuredGame);

    @Mapping(target = "id", source = "gameId")
    @Mapping(target = "popular", constant = "true")
    @Mapping(target = "hot", constant = "true")
    @Mapping(target = "topRated", constant = "false")
    GameDTO toGameDTO(Game game);

    @Mapping(target = "id", source = "gameId")
    @Mapping(target = "popular", constant = "true")
    @Mapping(target = "hot", constant = "true")
    @Mapping(target = "topRated", constant = "false")
    GameDetailDTO toGameDetailDTO(Game game);

}
