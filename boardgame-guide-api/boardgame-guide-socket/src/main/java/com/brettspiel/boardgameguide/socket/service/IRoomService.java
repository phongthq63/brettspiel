package com.brettspiel.boardgameguide.socket.service;

import com.brettspiel.boardgameguide.socket.controller.dto.request.JoinRoomRequest;
import com.brettspiel.boardgameguide.socket.controller.dto.request.LeaveRoomRequest;
import com.brettspiel.utils.R;

/**
 * Created by Quach Thanh Phong
 * On 12/25/2024 - 10:26 AM
 */
public interface IRoomService {

    R<?> joinRoom(JoinRoomRequest body);

    R<?> leaveRoom(LeaveRoomRequest body);

}
