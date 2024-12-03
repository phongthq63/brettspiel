package com.brettspiel.boardgameguide.socket.controller;

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

    @GetMapping("")
    public Object test() {
        return "Ok";
    }

}
