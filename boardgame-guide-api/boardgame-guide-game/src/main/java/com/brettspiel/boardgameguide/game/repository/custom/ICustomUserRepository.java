package com.brettspiel.boardgameguide.game.repository.custom;

import com.brettspiel.boardgameguide.game.entity.User;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 3:49 PM
 */
public interface ICustomUserRepository {

    User findById(String id);

    List<User> findByIds(List<String> ids);

}
