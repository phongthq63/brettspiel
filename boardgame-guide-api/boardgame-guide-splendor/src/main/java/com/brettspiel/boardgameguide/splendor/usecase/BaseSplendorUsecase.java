package com.brettspiel.boardgameguide.splendor.usecase;

import com.brettspiel.boardgameguide.splendor.controller.dto.request.TurnActionGatherGemRequest;
import com.brettspiel.boardgameguide.splendor.dto.PlayerDTO;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import com.brettspiel.utils.R;

import java.util.List;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 5/20/2025 - 1:09 PM
 */
public abstract class BaseSplendorUsecase<T> {

    public abstract T initGame(String roomId, List<PlayerDTO> players, Map<String, Object> setup);

    public abstract R<?> startGame(SplendorGame splendorGame);

    public abstract R<?> endTurn(String currentPlayer, SplendorGame splendorGame);

    public abstract R<?> turnActionGatherGem(String currentPlayer, SplendorGame splendorGame, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond);

    public abstract R<?> turnActionBuyCard(String currentPlayer, SplendorGame splendorGame, String cardId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond);

    public abstract R<?> turnActionReserveCard(String currentPlayer, SplendorGame splendorGame, int desk1, int desk2, int desk3, String cardId, int gold);

    public abstract R<?> turnBonusActionTakeNoble(String currentPlayer, SplendorGame splendorGame, String nobleId);

}
