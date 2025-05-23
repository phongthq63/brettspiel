package com.brettspiel.boardgameguide.splendor.usecase;

import com.brettspiel.boardgameguide.splendor.dto.PlayerDTO;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import com.brettspiel.utils.R;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 5/23/2025 - 2:40 PM
 */
@Component
public class SplendorExpansionOrientUseCase extends BaseSplendorUsecase<SplendorGame> {

    @Override
    public SplendorGame initGame(String roomId, List<PlayerDTO> players, Map<String, Object> setup) {
        return null;
    }

    @Override
    public R<?> startGame(SplendorGame splendorGame) {
        return null;
    }

    @Override
    public R<?> endTurn(String currentPlayer, SplendorGame splendorGame) {
        return null;
    }

    @Override
    public R<?> turnActionGatherGem(String currentPlayer, SplendorGame splendorGame, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond) {
        return null;
    }

    @Override
    public R<?> turnActionBuyCard(String currentPlayer, SplendorGame splendorGame, String cardId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond) {
        return null;
    }

    @Override
    public R<?> turnActionReserveCard(String currentPlayer, SplendorGame splendorGame, int desk1, int desk2, int desk3, String cardId, int gold) {
        return null;
    }

    @Override
    public R<?> turnBonusActionTakeNoble(String currentPlayer, SplendorGame splendorGame, String nobleId) {
        return null;
    }
}
