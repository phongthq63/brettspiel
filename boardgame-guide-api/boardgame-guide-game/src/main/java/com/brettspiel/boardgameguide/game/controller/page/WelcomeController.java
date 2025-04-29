package com.brettspiel.boardgameguide.game.controller.page;

import com.brettspiel.boardgameguide.game.constants.GameConstants;
import com.brettspiel.boardgameguide.game.controller.dto.response.GetStatisticsWelcomeResponse;
import com.brettspiel.boardgameguide.game.dto.FeaturedGameDTO;
import com.brettspiel.boardgameguide.game.service.IGameService;
import com.brettspiel.boardgameguide.game.service.IStatisticsService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 9:47 AM
 */
@Validated
@Tag(name = "Welcome", description = "API cho trang chào mừng")
@RestController
@RequestMapping(value = "/welcome")
@RequiredArgsConstructor
public class WelcomeController {

    private final IGameService gameService;

    private final IStatisticsService statisticsService;


    @GetMapping("/feature/game")
    @Operation(summary = "Lấy danh sách trò chơi nổi bật", description = "API này trả về danh sách các trò chơi nổi bật dựa trên tiêu chí sắp xếp và số lượng yêu cầu.")
    public R<List<FeaturedGameDTO>> getListFeatureGame(
            @Parameter(description = "Sắp xếp theo", schema = @Schema(allowableValues = {
                    GameConstants.SORT_BY_HOT,
                    GameConstants.SORT_BY_POPULAR,
                    GameConstants.SORT_BY_TOP_RATED
            })) @RequestParam(name = "soft_by", required = false) String sortBy,
            @Positive @Parameter(description = "Số lượng") @RequestParam(defaultValue = "3") Integer size) {
        return gameService.getListFeatureGame(sortBy, size);
    }

    @GetMapping("/statistics")
    @Operation(summary = "Lấy thống kê", description = "API này trả về thống kê")
    public R<GetStatisticsWelcomeResponse> getStatistics() {
        return statisticsService.getStatisticsWelcomePage();
    }

}
