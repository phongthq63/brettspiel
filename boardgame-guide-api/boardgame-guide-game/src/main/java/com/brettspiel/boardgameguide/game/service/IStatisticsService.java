package com.brettspiel.boardgameguide.game.service;

import com.brettspiel.boardgameguide.game.controller.dto.response.GetStatisticsWelcomeResponse;
import com.brettspiel.utils.R;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 3:24 PM
 */
public interface IStatisticsService {

    R<GetStatisticsWelcomeResponse> getStatisticsWelcomePage();

}
