package com.brettspiel.boardgameguide.game.mapper;

import com.brettspiel.boardgameguide.game.dto.BannerDTO;
import com.brettspiel.boardgameguide.game.entity.Banner;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 5:21 PM
 */
@Mapper(componentModel = "spring")
public interface BannerMapper {

    @Mapping(target = "id", source = "bannerId")
    BannerDTO toBannerDTO(Banner banner);

}
