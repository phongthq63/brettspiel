package com.brettspiel.boardgameguide.splendor.repository.custom;

import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import com.brettspiel.boardgameguide.splendor.entity.vo.Card;
import com.brettspiel.boardgameguide.splendor.entity.vo.Noble;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/13/2024 - 5:17 PM
 */
public interface ICustomSplendorGameRepository {

    SplendorGame findById(String gameId);

    SplendorGame findGameUserIn(String gameId, String userId);

    SplendorGame startGame(String gameId, List<Noble> deckNoble, List<Noble> fieldNoble, List<Card> deckCard1, List<Card> deckCard2, List<Card> deckCard3, List<Card> fieldCard1, List<Card> fieldCard2, List<Card> fieldCard3);

    SplendorGame endTurn(String gameId, String playerId);

    SplendorGame fillFieldLevel1(String gameId, String playerId, String cardId);

    SplendorGame fillFieldLevel2(String gameId, String playerId, String cardId);

    SplendorGame fillFieldLevel3(String gameId, String playerId, String cardId);

    SplendorGame gatherGem(String gameId, String playerId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond);

    SplendorGame buyCardInHand(String gameId, String playerId, String cardId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond);

    SplendorGame buyCardFieldLevel1(String gameId, String playerId, String cardId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond);

    SplendorGame buyCardFieldLevel2(String gameId, String playerId, String cardId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond);

    SplendorGame buyCardFieldLevel3(String gameId, String playerId, String cardId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond);

    SplendorGame reserveCardDeck1(String gameId, String playerId, String cardId, int gold);

    SplendorGame reserveCardDeck2(String gameId, String playerId, String cardId, int gold);

    SplendorGame reserveCardDeck3(String gameId, String playerId, String cardId, int gold);

    SplendorGame reserveCardField1(String gameId, String playerId, String cardId, int gold);

    SplendorGame reserveCardField2(String gameId, String playerId, String cardId, int gold);

    SplendorGame reserveCardField3(String gameId, String playerId, String cardId, int gold);

    SplendorGame takeNoble(String gameId, String playerId, String nobleId);

}
