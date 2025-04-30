package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Field;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Created by Quach Thanh Phong
 * On 4/30/2025 - 5:01 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GameVideoDTO extends BaseDTO {

    @Schema(
        description = "Mã định danh duy nhất của video",
        example = "video-001"
    )
    private String id;

    @Schema(
        description = "Mã của trò chơi mà video này thuộc về",
        example = "game-001"
    )
    private String gameId;

    @Schema(
        description = "Tiêu đề của video",
        example = "Hướng dẫn chơi cơ bản"
    )
    private String title;

    @Schema(
        description = "Nền tảng của video (ví dụ: YouTube, Vimeo)",
        example = "YouTube"
    )
    private String platform;

    @Schema(
            description = "URL đến hình ảnh thu nhỏ của video",
            example = "https://example.com/images/video-thumbnail.jpg"
    )
    private String thumbnailUrl;

    @Schema(
            description = "URL đến source của video",
            example = "https://example.com/video/video.mp3"
    )
    private String url;

}
