package com.brettspiel.boardgameguide.splendor.dto;

import com.brettspiel.boardgameguide.splendor.vo.CardVO;
import com.brettspiel.boardgameguide.splendor.vo.IngameDataVO;
import com.brettspiel.boardgameguide.splendor.vo.NobleVO;
import com.brettspiel.service.dto.BaseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 11:20 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SplendorGameDTO extends BaseDTO {

    @Schema(description = "Id game", example = "6739e14204ef47479a814e5b")
    private String gameId;

    @Schema(description = "Danh sách id người chơi", example = "[\"6739e185aa6d4921172c3ca2\"]")
    private List<String> playerIds;

    @Schema(description = "Trạng thái", example = "0")
    private Integer status;

    @Schema(description = "Thông tin các quý tộc")
    private List<NobleVO> nobles;

    @Schema(description = "Thông tin các lá bài")
    private List<CardVO> cards;

    @Schema(description = "Thông tin dữ liệu trong game")
    private IngameDataVO ingameData;

}
