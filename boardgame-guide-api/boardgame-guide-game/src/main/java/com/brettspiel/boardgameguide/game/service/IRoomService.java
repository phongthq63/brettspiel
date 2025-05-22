package com.brettspiel.boardgameguide.game.service;

import com.brettspiel.boardgameguide.game.dto.GameRoomDTO;
import com.brettspiel.utils.R;

/**
 * Created by Quach Thanh Phong
 * On 5/19/2025 - 1:01 PM
 */
public interface IRoomService {

    R<GameRoomDTO> createRoom(String userId, String sessionId, String gameId);

}
