package com.brettspiel.boardgameguide.game.mapper;

import com.brettspiel.boardgameguide.game.dto.GameRoomDTO;
import com.brettspiel.boardgameguide.game.entity.GameRoom;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created by Quach Thanh Phong
 * On 5/19/2025 - 1:17 PM
 */
@Mapper(componentModel = "spring")
public interface RoomMapper {

    @Mapping(target = "id", source = "roomId")
    GameRoomDTO toGameRoomDTO(GameRoom gameRoom);

}
