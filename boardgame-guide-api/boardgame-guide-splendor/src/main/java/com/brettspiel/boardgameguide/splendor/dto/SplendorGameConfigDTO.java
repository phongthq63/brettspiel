package com.brettspiel.boardgameguide.splendor.dto;

import com.brettspiel.boardgameguide.splendor.vo.CardVO;
import com.brettspiel.boardgameguide.splendor.vo.NobleVO;
import com.brettspiel.service.dto.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 5/22/2025 - 11:33 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SplendorGameConfigDTO extends BaseDTO {

    @Schema(description = "The score required to end the game", example = "15")
    private Integer endgameScore;

    @Schema(description = "The number of players in the game", example = "4")
    private Integer numberPlayer;

    @Schema(description = "The list of cards available in the game")
    private List<CardVO> cards;

    @Schema(description = "The list of nobles available in the game")
    private List<NobleVO> nobles;

    @Schema(description = "The number of nobles available", example = "5")
    private Integer noble;

    @Schema(description = "The number of gold tokens available", example = "5")
    private Integer gold;

    @Schema(description = "The number of onyx tokens available", example = "7")
    private Integer onyx;

    @Schema(description = "The number of ruby tokens available", example = "7")
    private Integer ruby;

    @Schema(description = "The number of emerald tokens available", example = "7")
    private Integer emerald;

    @Schema(description = "The number of sapphire tokens available", example = "7")
    private Integer sapphire;

    @Schema(description = "The number of diamond tokens available", example = "7")
    private Integer diamond;

}
