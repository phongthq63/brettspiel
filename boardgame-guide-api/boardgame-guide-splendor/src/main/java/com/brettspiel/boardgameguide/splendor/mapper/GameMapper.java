package com.brettspiel.boardgameguide.splendor.mapper;

import com.brettspiel.boardgameguide.splendor.dto.PlayerDTO;
import com.brettspiel.boardgameguide.splendor.dto.SplendorGameDTO;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import com.brettspiel.boardgameguide.splendor.entity.vo.IngameData;
import com.brettspiel.boardgameguide.splendor.entity.vo.PlayerInfo;
import org.mapstruct.Mapper;

import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 12:07 PM
 */
@Mapper(componentModel = "spring")
public interface GameMapper {

    IngameData toIngameData(SplendorGame splendorGame);

    SplendorGameDTO toSplendorGameDTO(SplendorGame splendorGame);

    PlayerInfo toPlayerInfo(PlayerDTO playerDTO);




    default PlayerDTO toPlayerDTO(Map<String, Object> player) {
        String id = player.get("id").toString();
        Object name = player.get("name");
        Object isBot = player.get("is_bot");
        Object isPlayer = player.get("is_player");
        Object local = player.get("local");
        return PlayerDTO.builder()
                .id(id)
                .name(name == null ? null : name.toString())
                .isBot(isBot != null && Boolean.parseBoolean(isBot.toString()))
                .isPlayer(isPlayer != null && Boolean.parseBoolean(isPlayer.toString()))
                .local(local == null ? null : local.toString())
                .build();
    }

}
