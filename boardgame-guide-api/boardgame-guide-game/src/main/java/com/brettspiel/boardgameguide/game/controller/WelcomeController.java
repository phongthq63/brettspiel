package com.brettspiel.boardgameguide.game.controller;

import com.brettspiel.boardgameguide.game.constants.GameConstants;
import com.brettspiel.boardgameguide.game.dto.FeaturedGameDTO;
import com.brettspiel.boardgameguide.game.service.IGameService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Parameter;
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
@Tag(name = "Welcome")
@RestController
@RequestMapping(value = "/welcome")
@RequiredArgsConstructor
public class WelcomeController {

    private final IGameService gameService;


    @GetMapping("/feature/game")
    public R<List<FeaturedGameDTO>> getListFeatureGame(
            @Parameter(description = "Sắp xếp theo") @RequestParam(name = "soft_by", required = false) GameConstants.SortBy sortBy,
            @Positive @Parameter(description = "Số lượng") @RequestParam(defaultValue = "3") Integer size) {
        return gameService.getListFeatureGame(sortBy, size);
    }

}
