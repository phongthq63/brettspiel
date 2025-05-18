package com.brettspiel.boardgameguide.gateway.service;

import com.brettspiel.boardgameguide.gateway.controller.dto.request.RefreshRequest;
import com.brettspiel.boardgameguide.gateway.controller.dto.response.LoginResponse;
import com.brettspiel.utils.R;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:22 AM
 */
public interface ILoginService {

    R<LoginResponse> loginByUsernamePassword(String username, String password);

    R<?> refresh(HttpServletResponse httpServletResponse, RefreshRequest body);

}
