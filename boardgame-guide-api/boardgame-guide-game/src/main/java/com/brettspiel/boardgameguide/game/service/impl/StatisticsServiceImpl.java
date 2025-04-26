package com.brettspiel.boardgameguide.game.service.impl;

import com.brettspiel.boardgameguide.game.controller.dto.response.GetStatisticsWelcomeResponse;
import com.brettspiel.boardgameguide.game.service.IStatisticsService;
import com.brettspiel.utils.R;
import org.springframework.stereotype.Service;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 3:24 PM
 */
@Service
public class StatisticsServiceImpl implements IStatisticsService {

    @Override
    public R<GetStatisticsWelcomeResponse> getStatisticsWelcomePage() {
        GetStatisticsWelcomeResponse getStatisticsWelcomeResponse = GetStatisticsWelcomeResponse.builder()
                .visitCount(100000)
                .currentPlayingPlayerCount(15862)
                .currentPlayingGameCount(5862)
                .gameCount(1538)
                .build();
        return R.ok(getStatisticsWelcomeResponse);
    }

}
