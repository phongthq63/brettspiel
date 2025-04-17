package com.brettspiel.boardgameguide.game.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class SendContactRequest extends BaseRequest {

    @NotBlank
    @Schema(description = "Tên người chơi", example = "Quách Thanh Phong")
    private String name;

    @NotBlank
    @Schema(description = "Email", example = "phongthq63@gmail.com")
    private String email;

    @NotBlank
    @Schema(description = "Tiêu đề", example = "Đây là tiêu đề")
    private String subject;

    @NotBlank
    @Schema(description = "Nội dung", example = "Đây là nội dung")
    private String message;

}
