package com.brettspiel.boardgameguide.splendor.mapper;

import com.brettspiel.boardgameguide.splendor.dto.SplendorTableDTO;
import com.brettspiel.boardgameguide.splendor.entity.SplendorTable;
import org.mapstruct.Mapper;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 12:07 PM
 */
@Mapper(componentModel = "spring")
public interface ITableMapper {

    SplendorTableDTO toSplendorTableDTO(SplendorTable splendorTable);

}
