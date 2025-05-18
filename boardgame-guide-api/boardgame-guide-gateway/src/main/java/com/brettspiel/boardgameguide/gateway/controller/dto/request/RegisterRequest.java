package com.brettspiel.boardgameguide.gateway.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Objects;

@EqualsAndHashCode(callSuper = true)
@Data
public class RegisterRequest extends BaseRequest {

    @NotBlank
    @Schema(description = "Nhập email", example = "phongthq63@gmail.com")
    private String email;

    @NotBlank
    @Schema(description = "Nhập password", example = "123456")
    private String password;

    @NotBlank
    @Schema(description = "Xác nhận password", example = "123456")
    private String confirm_password;


    @AssertTrue(message = "Mật khẩu xác nhận không trùng khớp")
    private boolean isValidConfirmPassword() {
        return Objects.equals(password, confirm_password);
    }

}
