package com.brettspiel.boardgameguide.gateway.repository.custom;

import com.brettspiel.boardgameguide.gateway.entity.Account;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:37 AM
 */
public interface ICustomAccountRepository {

    Account findByUsernameAndPassword(String username, String password);

    Account findByEmail(String email);

}
