package com.brettspiel.boardgameguide.splendor.mapper;

import com.brettspiel.boardgameguide.splendor.dto.SplendorGameDTO;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import org.mapstruct.Mapper;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 12:07 PM
 */
@Mapper(componentModel = "spring")
public interface IGameMapper {

    SplendorGameDTO toSplendorGameDTO(SplendorGame splendorGame);

}
