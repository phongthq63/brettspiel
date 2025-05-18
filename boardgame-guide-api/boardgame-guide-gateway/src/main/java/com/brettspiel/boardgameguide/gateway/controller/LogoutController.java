package com.brettspiel.boardgameguide.gateway.controller;

import com.brettspiel.boardgameguide.gateway.service.ILogoutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Quach Thanh Phong
 * On 5/17/2025 - 2:05 PM
 */
@Tag(name = "Logout", description = "API đăng xuất")
@RestController
@RequestMapping(value = "/logout")
@RequiredArgsConstructor
public class LogoutController {

    private final ILogoutService logoutService;


    @Operation(description = "Đăng xuất")
    @GetMapping("")
    public void logout() {
        logoutService.logout();
    }

}
