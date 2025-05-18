package com.brettspiel.boardgameguide.gateway.repository.custom;

import com.brettspiel.boardgameguide.gateway.entity.Login;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:33 AM
 */
public interface ICustomLoginRepository {

    Login findByRefreshToken(String refreshToken);

}
