package com.brettspiel.boardgameguide.splendor.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 12/5/2024 - 2:27 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TurnBonusActionTakeNobleRequest extends BaseRequest {

    @Schema(description = "Id người chơi", example = "a3b1ada4s12bs10b6d1a30x")
    private String playerId;

    @NotBlank
    @Schema(description = "Id quý tộc lấy", requiredMode = Schema.RequiredMode.REQUIRED, example = "noble_4r4g")
    private String nobleId;

}
