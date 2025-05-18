package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Created by Quach Thanh Phong
 * On 4/30/2025 - 3:36 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GameRuleDTO extends BaseDTO {
    
    @Schema(
        description = "Mã định danh duy nhất của luật chơi",
        example = "rule-001"
    )
    private String id;

    @Schema(
        description = "Mã của trò chơi mà luật này thuộc về",
        example = "game-001"
    )
    private String gameId;
    
    @Schema(
        description = "Tên của luật chơi",
        example = "Luật cơ bản"
    )
    private String name;

    @Schema(
            description = "Ngôn ngữ của luật chơi",
            example = "English"
    )
    private String language;

    @Schema(
        description = "URL đến biểu tượng hình ảnh đại diện cho luật",
        example = "https://example.com/images/rule-basic.png"
    )
    private String languageIconUrl;

    @Schema(
        description = "URL đến tài liệu chứa chi tiết về luật chơi",
        example = "https://example.com/docs/rule-basic.pdf"
    )
    private String documentUrl;
    
}
