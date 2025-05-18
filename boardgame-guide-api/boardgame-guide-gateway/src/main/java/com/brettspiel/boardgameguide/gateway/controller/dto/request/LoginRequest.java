package com.brettspiel.boardgameguide.gateway.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 10/28/2024 - 3:04 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class LoginRequest extends BaseRequest {

    @NotBlank
    @Schema(description = "Tên đăng nhập", requiredMode = Schema.RequiredMode.REQUIRED, example = "phongthq63")
    private String username;

    @NotBlank
    @Schema(description = "Mật khẩu", requiredMode = Schema.RequiredMode.REQUIRED, example = "123456")
    private String password;

}
