package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:38 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GamePlayersDTO extends BaseDTO {

    @Schema(description = "Mã định danh duy nhất của số lượng người chơi", example = "2-4")
    private String id;

    @Schema(description = "Hiển thị số lượng người chơi", example = "2-4")
    private String display;

}

