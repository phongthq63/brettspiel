package com.brettspiel.boardgameguide.socket.controller;

import com.brettspiel.boardgameguide.socket.controller.dto.request.JoinRoomRequest;
import com.brettspiel.boardgameguide.socket.controller.dto.request.LeaveRoomRequest;
import com.brettspiel.boardgameguide.socket.service.IRoomService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Quach Thanh Phong
 * On 12/25/2024 - 10:17 AM
 */
@Tag(name = "Room")
@RestController
@RequestMapping(value = "/room")
@RequiredArgsConstructor
public class RoomController {

    private final IRoomService roomService;


    @PostMapping("/join")
    public R<?> joinRoom(@Valid @RequestBody JoinRoomRequest body) {
        return roomService.joinRoom(body);
    }

    @PostMapping("/leave")
    public R<?> leaveRoom(@Valid @RequestBody LeaveRoomRequest body) {
        return roomService.leaveRoom(body);
    }

}
