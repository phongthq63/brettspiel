package com.brettspiel.boardgameguide.splendor.vo;

import com.brettspiel.service.vo.BaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/23/2024 - 12:57 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class IngamePlayerDataVO extends BaseVO {

    @Schema(description = "Điểm")
    private Integer score;

    @Schema(description = "Thông tin quý tộc sở hữu")
    private List<NobleVO> nobles;

    @Schema(description = "Thông tin bài đã mua")
    private List<CardVO> cards;

    @Schema(description = "Thông tin bài dự trữ")
    private List<CardVO> reserveCards = new ArrayList<>();

    @Schema(description = "Vàng", example = "5")
    private Integer gold;

    @Schema(description = "Mã não nền", example = "5")
    private Integer floorOnyx;

    @Schema(description = "Mã não", example = "5")
    private Integer onyx;

    @Schema(description = "Hồng ngọc nền", example = "5")
    private Integer floorRuby;

    @Schema(description = "Hồng ngọc", example = "5")
    private Integer ruby;

    @Schema(description = "Ngọc lục bảo nền", example = "5")
    private Integer floorEmerald;

    @Schema(description = "Ngọc lục bảo", example = "5")
    private Integer emerald;

    @Schema(description = "Đá saphia nền", example = "5")
    private Integer floorSapphire;

    @Schema(description = "Đá saphia", example = "5")
    private Integer sapphire;

    @Schema(description = "Kim cương nền", example = "5")
    private Integer floorDiamond;

    @Schema(description = "Kim cương", example = "5")
    private Integer diamond;

}
