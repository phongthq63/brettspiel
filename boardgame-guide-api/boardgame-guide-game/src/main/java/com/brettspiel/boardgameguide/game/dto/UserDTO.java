package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 3:47 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class UserDTO extends BaseDTO {

    @Schema(description = "Id", example = "0sa3c0a3c02xb5a30ga3sf")
    private String id;

    @Schema(description = "Tên hiển thị", example = "Quách Thanh Phong")
    private String name;

    @Schema(description = "URL ảnh đại diện", example = "https://example.com/images/game123.jpg")
    private String avatarUrl;

}
