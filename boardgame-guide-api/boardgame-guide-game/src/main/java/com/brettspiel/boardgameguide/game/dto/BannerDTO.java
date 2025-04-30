package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 5:18 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class BannerDTO extends BaseDTO {

    @Schema(description = "Mã định danh duy nhất của banner", example = "banner001")
    private String id;

    @Schema(description = "URL hình ảnh của banner", example = "https://example.com/images/game123.jpg")
    private String imageUrl;

    @Schema(description = "Mã định danh của trò chơi liên kết với banner", example = "game123")
    private String gameId;

    @Schema(description = "URL hình ảnh hộp trò chơi", example = "https://example.com/images/box_game123.jpg")
    private String gameImageBoxUrl;

    @Schema(description = "Tiêu đề của trò chơi", example = "Catan")
    private String gameTitle;

    @Schema(description = "Mô tả ngắn gọn về trò chơi", example = "A strategy game where players collect resources and build settlements.")
    private String gameDescription;

    @Schema(description = "URL hướng dẫn chơi trò chơi", example = "https://example.com/tutorials/catan")
    private String gameTutorialUrl;

    @Schema(description = "URL video chơi trò chơi", example = "https://example.com/gameplay/catan")
    private String gamePlayUrl;

}
