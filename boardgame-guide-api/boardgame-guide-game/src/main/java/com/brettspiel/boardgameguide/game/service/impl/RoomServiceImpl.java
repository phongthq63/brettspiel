package com.brettspiel.boardgameguide.game.service.impl;

import com.brettspiel.boardgameguide.game.dto.GameRoomDTO;
import com.brettspiel.boardgameguide.game.entity.GameRoom;
import com.brettspiel.boardgameguide.game.mapper.RoomMapper;
import com.brettspiel.boardgameguide.game.repository.IGameRoomRepository;
import com.brettspiel.boardgameguide.game.service.IRoomService;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Created by Quach Thanh Phong
 * On 5/19/2025 - 1:01 PM
 */
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService {

    private final IGameRoomRepository gameRoomRepository;

    private final RoomMapper roomMapper;


    @Override
    public R<GameRoomDTO> createRoom(String userId, String sessionId, String gameId) {
        GameRoom gameRoom = gameRoomRepository.findOwnerRoomInit(userId, sessionId, gameId);
        if (gameRoom != null) {
            return R.ok(roomMapper.toGameRoomDTO(gameRoom));
        }

        return R.failed();
    }
}
