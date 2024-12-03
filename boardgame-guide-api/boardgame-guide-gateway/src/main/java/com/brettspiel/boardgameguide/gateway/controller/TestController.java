package com.brettspiel.boardgameguide.gateway.controller;

import com.brettspiel.security.JwtHandler;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

/**
 * Created by Quach Thanh Phong
 * On 10/28/2024 - 2:56 PM
 */
@Slf4j
@Tag(name = "Test")
@RestController
@RequestMapping(value = "/test")
public class TestController {

    @Autowired
    private JwtHandler jwtHandler;

    @GetMapping("/token")
    public String token() {
        return jwtHandler.generateToken("userId", new HashMap<>() {
            {
                put("name", "username");
            }
        });
    }

    @GetMapping("")
    public Object test(Integer code) {
        return "OK";
    }
}
