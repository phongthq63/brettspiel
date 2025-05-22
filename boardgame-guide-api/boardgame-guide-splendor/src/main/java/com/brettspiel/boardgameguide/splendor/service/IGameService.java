package com.brettspiel.boardgameguide.splendor.service;

import com.brettspiel.boardgameguide.splendor.controller.dto.request.*;
import com.brettspiel.boardgameguide.splendor.dto.SplendorGameDTO;
import com.brettspiel.utils.R;

import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 11:31 AM
 */
public interface IGameService {

    R<SplendorGameDTO> getGameInfo(String userId, String gameId);

    void initGame(Map<String, Object> data);

    R<?> startGame(String userId, String gameId);

    R<?> startTurn(String userId, String gameId);

    R<?> endTurn(String userId, String gameId);

    R<?> turnActionGatherGem(String userId, String gameId, TurnActionGatherGemRequest body);

    R<?> turnActionBuyCard(String userId, String gameId, TurnActionBuyCardRequest body);

    R<?> turnActionReserveCard(String userId, String gameId, TurnActionReserveCardRequest body);

    R<?> turnBonusActionTakeNoble(String userId, String gameId, TurnBonusActionTakeNobleRequest body);

}
