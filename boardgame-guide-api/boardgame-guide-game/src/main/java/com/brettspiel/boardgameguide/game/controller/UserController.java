package com.brettspiel.boardgameguide.game.controller;

import com.brettspiel.boardgameguide.game.dto.UserDTO;
import com.brettspiel.boardgameguide.game.security.UserPrincipal;
import com.brettspiel.boardgameguide.game.service.IUserService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 2:34 PM
 */
@Validated
@Tag(name = "User", description = "API về người dùng")
@RestController
@RequestMapping(value = "/user")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;



    @Operation(summary = "Lấy thông tin người dùng", description = "API này cho phép người dùng lấy thông tin chính mình")
    @GetMapping("/me")
    public R<UserDTO> getMe(@Parameter(hidden = true) Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return userService.getUserInfo(userId);
    }

}
