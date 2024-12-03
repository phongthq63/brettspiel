package com.brettspiel.boardgameguide.splendor.controller;

import com.brettspiel.boardgameguide.splendor.controller.dto.request.StartGameRequest;
import com.brettspiel.boardgameguide.splendor.controller.dto.request.TurnActionBuyCardRequest;
import com.brettspiel.boardgameguide.splendor.controller.dto.request.TurnActionGatherGemRequest;
import com.brettspiel.boardgameguide.splendor.dto.SplendorGameDTO;
import com.brettspiel.boardgameguide.splendor.security.UserPrincipal;
import com.brettspiel.boardgameguide.splendor.service.IGameService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 11:19 AM
 */
@Tag(name = "Game")
@RestController
@RequestMapping(value = "/game")
public class GameController {

    @Autowired
    private IGameService gameService;



    @PostMapping("/init")
    public R<?> initGame(@Parameter(hidden = true) Authentication authentication,
                         @Valid @RequestBody StartGameRequest body) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return gameService.initGame(userId, body);
    }

    @GetMapping("/{gameId}")
    public R<SplendorGameDTO> getGameInfo(@Parameter(hidden = true) Authentication authentication,
                                          @PathVariable String gameId) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return gameService.getGameInfo(userId, gameId);
    }

    @PostMapping("/{gameId}/start")
    public R<?> startGame(@Parameter(hidden = true) Authentication authentication,
                          @PathVariable String gameId) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return gameService.startGame(userId, gameId);
    }

    @PostMapping("/{gameId}/turn/end")
    public R<?> endTurn(@Parameter(hidden = true) Authentication authentication,
                        @PathVariable String gameId) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return gameService.endTurn(userId, gameId);
    }

    @PostMapping("/{gameId}/turn/action/skip")
    public R<?> turnActionSkip(@Parameter(hidden = true) Authentication authentication,
                               @PathVariable String gameId) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return gameService.turnActionSkip(userId, gameId);
    }

    @PostMapping("/{gameId}/turn/action/gather-gem")
    public R<?> turnActionGatherGem(@Parameter(hidden = true) Authentication authentication,
                                    @PathVariable String gameId,
                                    @Valid @RequestBody TurnActionGatherGemRequest body) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return gameService.turnActionGatherGem(userId, gameId, body);
    }

    @PostMapping("/{gameId}/turn/action/buy-card")
    public R<?> turnActionBuyCard(@Parameter(hidden = true) Authentication authentication,
                                  @PathVariable String gameId,
                                  @Valid @RequestBody TurnActionBuyCardRequest body) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return gameService.turnActionBuyCard(userId, gameId, body);
    }

}
