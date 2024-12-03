package com.brettspiel.boardgameguide.splendor.vo;

import com.brettspiel.service.vo.BaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/19/2024 - 4:16 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class IngameDataVO extends BaseVO {

    @Schema(description = "Số lượng người chơi", example = "4")
    private Integer numberPlayer;

    @Schema(description = "Danh sách id người chơi", example = "[\"6739e185aa6d4921172c3ca2\"]")
    private List<String> playerIds;

    @Schema(description = "Điểm kết thúc game")
    private Integer endgameScore;

    @Schema(description = "Vòng", example = "14")
    private Integer round;

    @Schema(description = "Lượt", example = "2")
    private Integer turn;

    @Schema(description = "Người chơi hiện tại", example = "6739e185aa6d4921172c3ca2")
    private String currentPlayer;

    @Schema(description = "Người chơi tiếp theo", example = "6739e185aa6d4921172c3ca2")
    private String nextPlayer;

    @Schema(description = "Thông tin quý tộc trong deck")
    private List<NobleVO> deckNoble;

    @Schema(description = "Thông tin quý tộc trên sân")
    private List<FieldNobleVO> fieldNoble;

    @Schema(description = "Thông tin bài cấp 1 trong deck")
    private List<CardVO> deckCard1;

    @Schema(description = "Thông tin bài cấp 1 trên sân")
    private List<FieldCardVO> fieldCard1;

    @Schema(description = "Thông tin bài cấp 2 trong deck")
    private List<CardVO> deckCard2;

    @Schema(description = "Thông tin bài cấp 2 trên sân")
    private List<FieldCardVO> fieldCard2;

    @Schema(description = "Thông tin bài cấp 3 trong deck")
    private List<CardVO> deckCard3;

    @Schema(description = "Thông tin bài cấp 3 trên sân")
    private List<FieldCardVO> fieldCard3;

    @Schema(description = "Vàng", example = "5")
    private Integer gold;

    @Schema(description = "Mã não", example = "5")
    private Integer onyx;

    @Schema(description = "Hồng ngọc", example = "5")
    private Integer ruby;

    @Schema(description = "Ngọc lục bảo", example = "5")
    private Integer emerald;

    @Schema(description = "Đá saphia", example = "5")
    private Integer sapphire;

    @Schema(description = "Kim cương", example = "5")
    private Integer diamond;

    @Schema(description = "Thông tin dữ liệu của người chơi trong game")
    private List<IngamePlayerDataVO> players;

}
