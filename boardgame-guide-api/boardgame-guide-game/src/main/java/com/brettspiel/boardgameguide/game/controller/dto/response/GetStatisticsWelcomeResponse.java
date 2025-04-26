package com.brettspiel.boardgameguide.game.controller.dto.response;

import com.brettspiel.service.dto.response.BaseResponse;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 3:26 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
public class GetStatisticsWelcomeResponse extends BaseResponse {

    private long visitCount;

    private long currentPlayingPlayerCount;

    private long currentPlayingGameCount;

    private int gameCount;

}
