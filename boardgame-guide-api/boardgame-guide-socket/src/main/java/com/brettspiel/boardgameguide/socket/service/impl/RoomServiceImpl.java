package com.brettspiel.boardgameguide.socket.service.impl;

import com.brettspiel.boardgameguide.socket.controller.dto.request.JoinRoomRequest;
import com.brettspiel.boardgameguide.socket.controller.dto.request.LeaveRoomRequest;
import com.brettspiel.socket.service.ISocketIOService;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.brettspiel.boardgameguide.socket.service.IRoomService;

/**
 * Created by Quach Thanh Phong
 * On 12/25/2024 - 10:28 AM
 */
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService {

    private final ISocketIOService socketIOService;


    @Override
    public R<?> joinRoom(JoinRoomRequest body) {
        socketIOService.joinRoom(body.getUserId(), body.getRoomId());
        return R.ok();
    }

    @Override
    public R<?> leaveRoom(LeaveRoomRequest body) {
        socketIOService.leaveRoom(body.getUserId(), body.getRoomId());
        return R.ok();
    }
}
