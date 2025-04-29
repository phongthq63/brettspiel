package com.brettspiel.boardgameguide.game.controller.dto.response;

import com.brettspiel.boardgameguide.game.dto.GamePlayTimeDTO;
import com.brettspiel.boardgameguide.game.dto.GamePlayersDTO;
import com.brettspiel.boardgameguide.game.dto.GenreDTO;
import com.brettspiel.service.dto.response.BaseResponse;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:30 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
public class GetFilterGameResponse extends BaseResponse {

    @Schema(description = "Danh sách số lượng người chơi")
    private List<GamePlayersDTO> players;

    @Schema(description = "Danh sách thời gian chơi")
    private List<GamePlayTimeDTO> playTimes;

    @Schema(description = "Danh sách thể loại trò chơi")
    private List<GenreDTO> genres;

}
