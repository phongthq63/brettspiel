package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:41 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GamePlayTimeDTO extends BaseDTO {

    @Schema(description = "Mã định danh duy nhất của thời gian chơi", example = "30-60")
    private String id;

    @Schema(description = "Hiển thị thời gian chơi", example = "30-60")
    private String display;

}

