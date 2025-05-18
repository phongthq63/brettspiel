package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 5/12/2025 - 9:54 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GameExpansionDTO extends BaseDTO {

    @Schema(description = "Mã định danh duy nhất của mở rộng trò chơi", example = "expansion001")
    private String id;

    @Schema(description = "Mã định danh duy nhất của mở rộng trò chơi", example = "expansion001")
    private String gameId;

    @Schema(description = "Tên của mở rộng trò chơi", example = "Cờ tỷ phú - Mở rộng")
    private String name;

    @Schema(description = "Tiêu đề của mở rộng trò chơi", example = "Cờ tỷ phú - Mở rộng")
    private String title;

    @Schema(description = "URL hình ảnh của mở rộng trò chơi", example = "https://example.com/images/expansion001.jpg")
    private String imageUrl;

    @Schema(description = "URL hình ảnh hộp mở rộng trò chơi", example = "https://example.com/images/box_expansion001.jpg")
    private String imageBoxUrl;

    @Schema(description = "Mô tả chi tiết về mở rộng trò chơi", example = "Cờ tỷ phú - Mở rộng là một phiên bản mở rộng của trò chơi cờ tỷ phú, bổ sung thêm nhiều tính năng mới.")
    private String description;

    @Schema(description = "Số lượng người chơi tối thiểu", example = "2")
    private Integer minPlayers;

    @Schema(description = "Số lượng người chơi tối đa", example = "6")
    private Integer maxPlayers;

    @Schema(description = "Danh sách luật chơi của trò chơi")
    private List<GameRuleDTO> rules;

    @Schema(description = "Thông tin chuẩn bị cho mở rộng trò chơi")
    private Map<String, Object> setup;

}
