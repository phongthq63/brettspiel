package com.brettspiel.boardgameguide.game.repository.custom;

import com.brettspiel.boardgameguide.game.entity.GameRoom;

/**
 * Created by Quach Thanh Phong
 * On 5/15/2025 - 3:48 PM
 */
public interface ICustomGameRoomRepository {

    GameRoom findById(String id);

    GameRoom findOwnerRoomInit(String userId, String sessionId, String gameId);

}
