package com.brettspiel.boardgameguide.gateway.controller;

import com.brettspiel.boardgameguide.gateway.controller.dto.request.RegisterRequest;
import com.brettspiel.boardgameguide.gateway.service.IRegisterService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:42 AM
 */
@Validated
@Tag(name = "Register", description = "API đăng kí")
@RestController
@RequestMapping(value = "/register")
@RequiredArgsConstructor
public class RegisterController {

    private final IRegisterService registerService;


    @Operation(description = "Tạo tài khoản")
    @PostMapping(value = "", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public R<?> register(@Valid RegisterRequest request){
        return registerService.registerByUsernamePassword(request.getEmail(), request.getPassword(), request.getConfirm_password());
    }

}
