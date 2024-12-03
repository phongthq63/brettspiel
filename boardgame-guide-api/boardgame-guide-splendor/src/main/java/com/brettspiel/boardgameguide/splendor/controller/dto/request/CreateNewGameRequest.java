package com.brettspiel.boardgameguide.splendor.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 11:24 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CreateNewGameRequest extends BaseRequest {

    @Positive
    @Schema(description = "Số lượng người chơi", requiredMode = Schema.RequiredMode.REQUIRED, example = "4")
    private Integer numberPlayer;

}
