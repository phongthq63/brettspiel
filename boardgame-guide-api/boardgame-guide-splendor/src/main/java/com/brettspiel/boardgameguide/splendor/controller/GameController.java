package com.brettspiel.boardgameguide.splendor.controller;

import com.brettspiel.boardgameguide.splendor.controller.dto.request.*;
import com.brettspiel.boardgameguide.splendor.dto.SplendorGameDTO;
import com.brettspiel.boardgameguide.splendor.security.UserPrincipal;
import com.brettspiel.boardgameguide.splendor.service.IGameService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 11:19 AM
 */
@Tag(name = "Game")
@RestController
@RequestMapping(value = "/game")
@RequiredArgsConstructor
public class GameController {

    private final IGameService gameService;



    @PostMapping("/init")
    public R<SplendorGameDTO> initGame(@Parameter(hidden = true) Authentication authentication,
                         @Valid @RequestBody InitGameRequest body) {
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

    @PostMapping("/{gameId}/turn/start")
    public R<?> startTurn(@Parameter(hidden = true) Authentication authentication,
                          @PathVariable String gameId) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return gameService.startTurn(userId, gameId);
    }

    @PostMapping("/{gameId}/turn/end")
    public R<?> endTurn(@Parameter(hidden = true) Authentication authentication,
                        @PathVariable String gameId) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return gameService.endTurn(userId, gameId);
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

    @PostMapping("/{gameId}/turn/action/reserve-card")
    public R<?> turnActionReserveCard(@Parameter(hidden = true) Authentication authentication,
                                      @PathVariable String gameId,
                                      @Valid @RequestBody TurnActionReserveCardRequest body) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return gameService.turnActionReserveCard(userId, gameId, body);
    }

    @PostMapping("/{gameId}/turn/bonus-action/take-noble")
    public R<?> turnBonusActionTakeNoble(@Parameter(hidden = true) Authentication authentication,
                                         @PathVariable String gameId,
                                         @Valid @RequestBody TurnBonusActionTakeNobleRequest body) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return gameService.turnBonusActionTakeNoble(userId, gameId, body);
    }

}
