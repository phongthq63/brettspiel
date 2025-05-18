package com.brettspiel.boardgameguide.game.service;

import com.brettspiel.boardgameguide.game.dto.UserDTO;
import com.brettspiel.utils.R;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 3:52 PM
 */
public interface IUserService {

    R<UserDTO> getUserInfo(String userId);

}
