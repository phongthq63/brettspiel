package com.brettspiel.boardgameguide.game.mapper;

import com.brettspiel.boardgameguide.game.dto.GenreDTO;
import com.brettspiel.boardgameguide.game.entity.Genre;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 4:49 PM
 */
@Mapper(componentModel = "spring")
public interface GenreMapper {

    @Mapping(target = "id", source = "genreId")
    GenreDTO toGenreDTO(Genre genre);

}
