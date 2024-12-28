package com.brettspiel.boardgameguide.socket.controller;

import com.brettspiel.socket.service.ISocketIOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

/**
 * Created by Quách Thanh Phong
 * On 7/2/2023 - 2:35 AM
 */
@RestController
@RequestMapping(value = "/test")
public class TestController {

    @Autowired
    private ISocketIOService socketIOService;

    @GetMapping("")
    public Object test(String roomId) {

        socketIOService.broadcastMessageToRoom(roomId, "game_splendor", "test");

        return "Ok";
    }

}
