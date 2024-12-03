package com.brettspiel.boardgameguide.splendor.service;

import com.brettspiel.boardgameguide.splendor.controller.dto.request.StartGameRequest;
import com.brettspiel.boardgameguide.splendor.controller.dto.request.TurnActionBuyCardRequest;
import com.brettspiel.boardgameguide.splendor.controller.dto.request.TurnActionGatherGemRequest;
import com.brettspiel.boardgameguide.splendor.dto.SplendorGameDTO;
import com.brettspiel.utils.R;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 11:31 AM
 */
public interface IGameService {

    R<?> initGame(String userId, StartGameRequest body);

    R<SplendorGameDTO> getGameInfo(String userId, String gameId);

    R<?> startGame(String userId, String gameId);

    R<?> endTurn(String userId, String gameId);

    R<?> turnActionSkip(String userId, String gameId);

    R<?> turnActionGatherGem(String userId, String gameId, TurnActionGatherGemRequest body);

    R<?> turnActionBuyCard(String userId, String gameId, TurnActionBuyCardRequest body);

}
