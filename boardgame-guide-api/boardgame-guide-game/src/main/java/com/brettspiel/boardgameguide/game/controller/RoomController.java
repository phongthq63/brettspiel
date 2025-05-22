package com.brettspiel.boardgameguide.game.controller;

import com.brettspiel.boardgameguide.game.controller.dto.request.CreateRoomRequest;
import com.brettspiel.boardgameguide.game.dto.GameRoomDTO;
import com.brettspiel.boardgameguide.game.security.UserPrincipal;
import com.brettspiel.boardgameguide.game.service.IRoomService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Quach Thanh Phong
 * On 5/19/2025 - 11:51 AM
 */
@Tag(name = "Room", description = "API để xử lý nghiệp vụ phòng chơi")
@RestController
@RequestMapping(value = "/room")
@RequiredArgsConstructor
public class RoomController {

    private final IRoomService roomService;


    @PostMapping("")
    public R<GameRoomDTO> createRoom(@Parameter(hidden = true) Authentication authentication,
                                     @Valid @RequestBody CreateRoomRequest request) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return roomService.createRoom(userId, request.getSessionId(), request.getGameId());
    }

}
