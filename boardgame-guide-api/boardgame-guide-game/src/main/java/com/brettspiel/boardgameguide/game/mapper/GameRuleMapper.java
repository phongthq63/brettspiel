package com.brettspiel.boardgameguide.game.mapper;

import com.brettspiel.boardgameguide.game.dto.GameRuleDTO;
import com.brettspiel.boardgameguide.game.entity.GameRule;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created by Quach Thanh Phong
 * On 4/30/2025 - 3:40 PM
 */
@Mapper(componentModel = "spring")
public interface GameRuleMapper {

    @Mapping(target = "id", source = "ruleId")
    GameRuleDTO toGameRuleDTO(GameRule gameRule);

}
