package com.brettspiel.boardgameguide.game.service;

import com.brettspiel.boardgameguide.game.controller.dto.request.StartPlayRequest;
import com.brettspiel.utils.R;
import jakarta.validation.Valid;

/**
 * Created by Quach Thanh Phong
 * On 5/14/2025 - 4:55 PM
 */
public interface IPlayService {

    R<?> startPlay(String userId, StartPlayRequest request);

}
