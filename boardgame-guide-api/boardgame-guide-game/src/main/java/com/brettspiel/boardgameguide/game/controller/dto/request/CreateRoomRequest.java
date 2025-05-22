package com.brettspiel.boardgameguide.game.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 5/19/2025 - 1:02 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CreateRoomRequest extends BaseRequest {

    @NotEmpty
    @Schema(description = "Id game", example = "game01")
    private String gameId;

    @NotEmpty
    @Schema(description = "Id session", example = "session01")
    private String sessionId;

}
