package com.brettspiel.boardgameguide.splendor.vo;

import com.brettspiel.service.vo.BaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 11/27/2024 - 3:58 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class NobleCostVO extends BaseVO {

    @Schema(description = "Số lượng bài mã não", example = "1")
    private int card0nyx;

    @Schema(description = "Số lượng bài hồng ngọc", example = "2")
    private int cardRuby;

    @Schema(description = "Số lượng bài ngọc lục bảo", example = "3")
    private int cardEmerald;

    @Schema(description = "Số lượng bài đá saphia", example = "4")
    private int cardSapphire;

    @Schema(description = "Số lượng bài kim cương", example = "5")
    private int cardDiamond;

}
