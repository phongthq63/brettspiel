package com.brettspiel.boardgameguide.game.controller;

import com.brettspiel.boardgameguide.game.constants.GameConstants;
import com.brettspiel.boardgameguide.game.controller.dto.response.GetFilterGameResponse;
import com.brettspiel.boardgameguide.game.dto.GameDTO;
import com.brettspiel.boardgameguide.game.service.IGameService;
import com.brettspiel.service.dto.PageDTO;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 7:03 PM
 */
@Validated
@Tag(name = "Game", description = "API để lấy thông tin trò chơi")
@RestController
@RequestMapping(value = "/game")
@RequiredArgsConstructor
public class GameController {

    private final IGameService gameService;


    @GetMapping("/filter")
    @Operation(summary = "Lấy bộ lọc trò chơi", description = "API này trả về danh sách các bộ lọc có thể áp dụng cho trò chơi, bao gồm thể loại, số lượng người chơi, và thời gian chơi.")
    public R<GetFilterGameResponse> getFilterGame() {
        return gameService.getFilterGame();
    }

    @GetMapping("")
    @Operation(summary = "Lấy danh sách trò chơi", description = "API này trả về danh sách các trò chơi dựa trên các bộ lọc và sắp xếp được cung cấp.")
    public R<PageDTO<GameDTO>> getListGame(
            @RequestParam(required = false) Set<String> players,
            @RequestParam(name = "play_times", required = false) Set<String> playTimes,
            @RequestParam(required = false) Set<String> genres,
            @Parameter(description = "Sắp xếp theo", schema = @Schema(allowableValues = {
                    GameConstants.SORT_BY_HOT,
                    GameConstants.SORT_BY_POPULAR,
                    GameConstants.SORT_BY_TOP_RATED
            })) @RequestParam(name = "soft_by", required = false) String sortBy,
            @PositiveOrZero @Parameter(description = "Trang") @RequestParam(defaultValue = "0") Integer page,
            @Positive @Parameter(description = "Số lượng") @RequestParam(defaultValue = "10") Integer size) {
        return gameService.getListGame(players, playTimes, genres, sortBy, page, size);
    }

}
