package com.brettspiel.boardgameguide.game.service.impl;

import com.brettspiel.boardgameguide.game.dto.UserDTO;
import com.brettspiel.boardgameguide.game.entity.User;
import com.brettspiel.boardgameguide.game.mapper.UserMapper;
import com.brettspiel.boardgameguide.game.repository.IUserRepository;
import com.brettspiel.boardgameguide.game.service.IUserService;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 3:52 PM
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;

    private final UserMapper userMapper;


    @Override
    public R<UserDTO> getUserInfo(String userId) {
        User user = userRepository.findById(userId);
        if (user == null) {
            return R.failed("User not found");
        }

        return R.ok(userMapper.toUserDTO(user));
    }
}
