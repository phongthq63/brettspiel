package com.brettspiel.boardgameguide.gateway.controller;

import com.brettspiel.boardgameguide.gateway.controller.dto.request.LoginRequest;
import com.brettspiel.boardgameguide.gateway.controller.dto.request.RefreshRequest;
import com.brettspiel.boardgameguide.gateway.controller.dto.response.LoginResponse;
import com.brettspiel.boardgameguide.gateway.service.ILoginService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:17 AM
 */
@Validated
@Tag(name = "Login", description = "API login")
@RestController
@RequestMapping(value = "/login")
@RequiredArgsConstructor
public class LoginController {

    private final ILoginService loginService;


    @Operation(description = "Đăng nhâp")
    @PostMapping(value = "", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public R<LoginResponse> loginByUsernamePassword(@Valid LoginRequest body) {
        return loginService.loginByUsernamePassword(body.getUsername(), body.getPassword());
    }

    @Operation(description = "Refresh token (set access-token + refresh-token vào cookie)")
    @PostMapping("/refresh")
    public R<?> refresh(@Parameter(hidden = true) HttpServletResponse httpServletResponse,
                        @RequestBody @Valid RefreshRequest body) {
        return loginService.refresh(httpServletResponse, body);
    }

}
