package com.brettspiel.boardgameguide.gateway.service;

import com.brettspiel.utils.R;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:43 AM
 */
public interface IRegisterService {

    R<?> registerByUsernamePassword(String email, String password, String confirmPassword);

}
