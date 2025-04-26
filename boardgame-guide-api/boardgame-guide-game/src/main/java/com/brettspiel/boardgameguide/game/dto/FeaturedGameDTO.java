package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 9:49 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class FeaturedGameDTO extends BaseDTO {

    @Schema(description = "ID của game", example = "game123")
    private String id;

    @Schema(description = "Tiêu đề game", example = "Cờ tỷ phú")
    private String title;

    @Schema(description = "Mô tả game", example = "Trò chơi kinh điển về bất động sản")
    private String description;

    @Schema(description = "Đường dẫn ảnh đại diện game", example = "https://example.com/image.jpg")
    private String imageUrl;

    @Schema(description = "Thời gian chơi tối thiểu", example = "30")
    private Integer minPlayTime;

    @Schema(description = "Thời gian chơi tối đa", example = "120")
    private Integer maxPlayTime;

    @Schema(description = "Số người chơi tối thiểu", example = "2")
    private Integer minPlayers;

    @Schema(description = "Số người chơi tối đa", example = "6")
    private Integer maxPlayers;

    @Schema(description = "Độ phổ biến của game", example = "1000")
    private Integer popular;

    @Schema(description = "Game hot", example = "1")
    private Integer hot;

    @Schema(description = "Game được đánh giá cao", example = "1")
    private Integer topRated;

}
