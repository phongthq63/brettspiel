package com.brettspiel.boardgameguide.splendor.dto;

import com.brettspiel.service.dto.BaseDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Created by Quach Thanh Phong
 * On 5/20/2025 - 1:14 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
public class PlayerDTO extends BaseDTO {

    @Schema(description = "ID của người chơi", example = "player1")
    private String id;

    @Schema(description = "URL ảnh đại diện", example = "https://example.com/images/game123.jpg")
    private String avatarUrl;

    @Schema(description = "Tên người chơi", example = "Alice")
    private String name;

    @JsonProperty("is_bot")
    @Schema(description = "Có phải là bot không", example = "false")
    private boolean isBot;

    @JsonProperty("is_player")
    @Schema(description = "Có phải là người chơi chính không", example = "true")
    private boolean isPlayer;

    @Schema(description = "Ngôn ngữ của người chơi", example = "en")
    private String local;

}
