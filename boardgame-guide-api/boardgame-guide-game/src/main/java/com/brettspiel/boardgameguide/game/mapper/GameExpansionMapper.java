package com.brettspiel.boardgameguide.game.mapper;

import com.brettspiel.boardgameguide.game.dto.GameExpansionDTO;
import com.brettspiel.boardgameguide.game.entity.GameExpansion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created by Quach Thanh Phong
 * On 5/12/2025 - 10:14 AM
 */
@Mapper(componentModel = "spring", uses = {GameRuleMapper.class})
public interface GameExpansionMapper {

    @Mapping(target = "id", source = "expansionId")
    GameExpansionDTO toGameExpansionDTO(GameExpansion gameExpansion);

}
