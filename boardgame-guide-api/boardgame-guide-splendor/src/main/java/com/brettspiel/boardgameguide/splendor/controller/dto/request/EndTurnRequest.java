package com.brettspiel.boardgameguide.splendor.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 5/22/2025 - 5:01 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class EndTurnRequest extends BaseRequest {

    @Schema(description = "Id người chơi", example = "a3b1ada4s12bs10b6d1a30x")
    private String playerId;

}
