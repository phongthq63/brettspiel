package com.brettspiel.boardgameguide.splendor.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 11/17/2024 - 8:04 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class StartGameRequest extends BaseRequest {

    @NotBlank
    @Schema(description = "Id bàn chơi",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "6a83v1ac1a68sgva03cs0a3sc1")
    private String tableId;

}
