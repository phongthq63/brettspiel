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

    @Schema(description = "Id người chơi", example = "63adv0adv84a3ds121asc")
    private String playerId;

    @Schema(description = "Điểm", example = "12")
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
    private List<CardVO> cardOnyx;

    @Schema(description = "Mã não", example = "5")
    private Integer onyx;

    @Schema(description = "Hồng ngọc nền", example = "5")
    private List<CardVO> cardRuby;

    @Schema(description = "Hồng ngọc", example = "5")
    private Integer ruby;

    @Schema(description = "Ngọc lục bảo nền", example = "5")
    private List<CardVO> cardEmerald;

    @Schema(description = "Ngọc lục bảo", example = "5")
    private Integer emerald;

    @Schema(description = "Đá saphia nền", example = "5")
    private List<CardVO> cardSapphire;

    @Schema(description = "Đá saphia", example = "5")
    private Integer sapphire;

    @Schema(description = "Kim cương nền", example = "5")
    private List<CardVO> cardDiamond;

    @Schema(description = "Kim cương", example = "5")
    private Integer diamond;

}
