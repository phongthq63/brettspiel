package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 5/19/2025 - 1:13 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GameRoomDTO extends BaseDTO {

    @Schema(description = "Mã định danh duy nhất của phòng chơi", example = "room001")
    private String id;

    @Schema(description = "Mã định danh duy nhất của trò chơi", example = "game001")
    private String gameId;

}
