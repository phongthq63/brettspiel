package com.brettspiel.boardgameguide.gateway.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 11/21/2024 - 4:59 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class RefreshRequest extends BaseRequest {

    @NotBlank
    @Schema(description = "Refresh token", example = "sda0s20c3as0ca58v1av1")
    private String refreshToken;

}
