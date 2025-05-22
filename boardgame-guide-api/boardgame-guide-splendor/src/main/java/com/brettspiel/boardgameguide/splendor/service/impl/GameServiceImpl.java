package com.brettspiel.boardgameguide.splendor.service.impl;

import com.brettspiel.assist.SocketAssist;
import com.brettspiel.boardgameguide.constant.ServiceConstants;
import com.brettspiel.boardgameguide.splendor.constant.GameConstants;
import com.brettspiel.boardgameguide.splendor.controller.dto.request.*;
import com.brettspiel.boardgameguide.splendor.dto.PlayerDTO;
import com.brettspiel.boardgameguide.splendor.dto.SplendorGameDTO;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import com.brettspiel.boardgameguide.splendor.entity.vo.*;
import com.brettspiel.boardgameguide.splendor.mapper.GameMapper;
import com.brettspiel.boardgameguide.splendor.repository.ISplendorGameRepository;
import com.brettspiel.boardgameguide.splendor.service.IGameService;
import com.brettspiel.boardgameguide.splendor.usecase.SplendorStandardUsecase;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 11:31 AM
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements IGameService {

    private final ISplendorGameRepository splendorGameRepository;

    private final SplendorStandardUsecase splendorStandardUsecase;

    private final GameMapper gameMapper;

    private final SocketAssist socketAssist;



    @Override
    public R<SplendorGameDTO> getGameInfo(String userId, String gameId) {
        SplendorGame splendorGame = splendorGameRepository.findById(gameId);
        if (splendorGame == null) {
            return R.failed("Game info not found");
        }

        return R.ok(gameMapper.toSplendorGameDTO(splendorGame));
    }

    @Override
    public void initGame(Map<String, Object> data) {
        log.info("GameService - initGame - {}", data);

        // Data
        String roomId = (String) data.get("room_id");
        String gameId = (String) data.get("game_id");
        List<Map<String, Object>> players = (List<Map<String, Object>>) data.get("players");
        Map<String, Object> setup = (Map<String, Object>) data.get("setup");
        List<PlayerDTO> playerDTOS = players.stream()
                .map(gameMapper::toPlayerDTO)
                .toList();

        // Init game
        String gameType = setup.get("type") == null ? "base" : setup.get("type").toString();
        SplendorGame splendorGame;
        switch (gameType) {
            case GameConstants.GAME_TYPE_BASE:
                splendorGame = splendorStandardUsecase.initGame(roomId, playerDTOS, setup);
                break;
            case GameConstants.GAME_TYPE_EXTENSION:
                // todo: handle extension
                splendorGame = splendorStandardUsecase.initGame(roomId, playerDTOS, setup);
                break;
            default:
                splendorGame = splendorStandardUsecase.initGame(roomId, playerDTOS, setup);
                break;
        }

        // Update status

        // Notify to all user in room
        socketAssist.broadcastMessageToRoom(roomId, "game", new HashMap<>() {
            {
                put("id", splendorGame.getGameId());
                put("game_id", gameId);
            }
        });
    }

    @Override
    public R<?> startGame(String userId, String gameId) {
        // Get from db
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("startGame - User not in game - {} {}", gameId, userId);
            return R.failed("User not in game");
        }
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                break;
            case GameConstants.STATUS_PLAY:
                log.error("startGame - Game have started - {} {}", gameId, userId);
                return R.ok();
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }

        return splendorStandardUsecase.startGame(splendorGame);
    }

    @Override
    public R<?> startTurn(String userId, String gameId) {
        // Get from db
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("startTurn - User not in game - {} {}", gameId, userId);
            return R.failed("User not in game");
        }
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                log.error("startTurn - Game not start - {} {}", gameId, userId);
                return R.failed("Game not start");
            case GameConstants.STATUS_PLAY:
                break;
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }

        // Fill card to field
        String cardIdDeck1 = null;
        if (!splendorGame.getIngameData().getDeckCard1().isEmpty() &&
                splendorGame.getIngameData().getFieldCard1().stream()
                        .anyMatch(fieldCard -> fieldCard.getCard() == null)) {
            cardIdDeck1 = splendorGame.getIngameData().getDeckCard1().getFirst().getId();
            splendorGame = splendorGameRepository.fillFieldLevel1(gameId, userId, cardIdDeck1);
            if (splendorGame == null) {
                log.error("startTurn - Fill field card 1 error - {} {}", gameId, userId);
                return R.failed("Fill field card 1 error");
            }
        }
        String cardIdDeck2 = null;
        if (!splendorGame.getIngameData().getDeckCard2().isEmpty() &&
                splendorGame.getIngameData().getFieldCard2().stream()
                        .anyMatch(fieldCard -> fieldCard.getCard() == null)) {
            cardIdDeck2 = splendorGame.getIngameData().getDeckCard2().getFirst().getId();
            splendorGame = splendorGameRepository.fillFieldLevel2(gameId, userId, cardIdDeck2);
            if (splendorGame == null) {
                log.error("startTurn - Fill field card 2 error - {} {}", gameId, userId);
                return R.failed("Fill field card 2 error");
            }
        }
        String cardIdDeck3 = null;
        if (!splendorGame.getIngameData().getDeckCard3().isEmpty() &&
                splendorGame.getIngameData().getFieldCard3().stream()
                        .anyMatch(fieldCard -> fieldCard.getCard() == null)) {
            cardIdDeck3 = splendorGame.getIngameData().getDeckCard3().getFirst().getId();
            splendorGame = splendorGameRepository.fillFieldLevel3(gameId, userId, cardIdDeck3);
            if (splendorGame == null) {
                log.error("startTurn - Fill field card 3 error - {} {}", gameId, userId);
                return R.failed("Fill field card 3 error");
            }
        }

        // Notify to all user in game
        SplendorGame finalSplendorGame = splendorGame;
        List<String> fieldCard1 = cardIdDeck1 == null ? new ArrayList<>() : List.of(cardIdDeck1);
        List<String> fieldCard2 = cardIdDeck2 == null ? new ArrayList<>() : List.of(cardIdDeck2);
        List<String> fieldCard3 = cardIdDeck3 == null ? new ArrayList<>() : List.of(cardIdDeck3);
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), "", new HashMap<>() {
            {
                put("service_type", ServiceConstants.SERVICE_GAME_SPLENDOR);
                put("event_type", GameConstants.EVENT_START_TURN);
                put("game_id", finalSplendorGame.getGameId());
                put("room_id", finalSplendorGame.getRoomId());
                put("players", finalSplendorGame.getPlayers());
                put("round", finalSplendorGame.getIngameData().getRound());
                put("turn", finalSplendorGame.getIngameData().getTurn());
                put("current_player", finalSplendorGame.getIngameData().getCurrentPlayer());
                put("next_player", finalSplendorGame.getIngameData().getNextPlayer());
                put("field_card_1", fieldCard1);
                put("field_card_2", fieldCard2);
                put("field_card_3", fieldCard3);
            }
        });

        return R.ok();
    }

    @Override
    public R<?> endTurn(String userId, String gameId) {
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("endTurn - User not in game - {} {}", gameId, userId);
            return R.failed("User not in game");
        }
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                log.error("endTurn - Game not start - {} {}", gameId, userId);
                return R.failed("Game not start");
            case GameConstants.STATUS_PLAY:
                break;
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }

        // Update turn in db
        splendorGame = splendorGameRepository.endTurn(gameId, userId);
        if (splendorGame == null) {
            log.error("endTurn - End turn error - {} {}", gameId, userId);
            return R.failed("This is not your turn");
        }

        // Notify all user in game
        SplendorGame finalSplendorGame = splendorGame;
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), "", new HashMap<>() {
            {
                put("service_type", ServiceConstants.SERVICE_GAME_SPLENDOR);
                put("event_type", GameConstants.EVENT_END_TURN);
                put("game_id", finalSplendorGame.getGameId());
                put("room_id", finalSplendorGame.getRoomId());
                put("player_id", userId);
                put("round", finalSplendorGame.getIngameData().getRound());
                put("turn", finalSplendorGame.getIngameData().getTurn());
                put("current_player", finalSplendorGame.getIngameData().getCurrentPlayer());
                put("next_player", finalSplendorGame.getIngameData().getNextPlayer());
            }
        });

        return R.ok();
    }

    @Override
    public R<?> turnActionGatherGem(String userId, String gameId, TurnActionGatherGemRequest body) {
        int gold = body.getGold() == null ? 0 : body.getGold();
        int onyx = body.getOnyx() == null ? 0 : body.getOnyx();
        int ruby = body.getRuby() == null ? 0 : body.getRuby();
        int emerald = body.getEmerald() == null ? 0 : body.getEmerald();
        int sapphire = body.getSapphire() == null ? 0 : body.getSapphire();
        int diamond = body.getDiamond() == null ? 0 : body.getDiamond();
        if (gold > 0) {
            return R.failed("Can't gather gold");
        }
        if ((onyx + ruby + emerald + sapphire + diamond > 3) ||
                onyx > 2 ||
                ruby > 2 ||
                emerald > 2 ||
                sapphire > 2 ||
                diamond > 2) {
            return R.failed("Gather gem break rule game");
        }

        // Get from db
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("turnActionGatherGem - User not in game - {} {}", gameId, userId);
            return R.failed("User not in game");
        }
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                log.error("turnActionGatherGem - Game not start - {} {}", gameId, userId);
                return R.failed("Game not start");
            case GameConstants.STATUS_PLAY:
                break;
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }
        if (!Objects.equals(splendorGame.getIngameData().getCurrentPlayer(), userId)) {
            log.error("turnActionGatherGem - Current turn isn't player - {} {}", gameId, userId);
            return R.failed("Current turn isn't you");
        }
        if ((splendorGame.getIngameData().getOnyx() < 4 && onyx == 2) ||
                (splendorGame.getIngameData().getRuby() < 4 && ruby == 2) ||
                (splendorGame.getIngameData().getEmerald() < 4 && emerald == 2) ||
                (splendorGame.getIngameData().getSapphire() < 4 && sapphire == 2) ||
                (splendorGame.getIngameData().getDiamond() < 4 && diamond == 2)) {
            return R.failed("Gather gem break rule game");
        }

        // Player data ingame
        IngamePlayerData playerData = splendorGame.getIngameData().getPlayers().stream()
                .filter(ingamePlayerData -> Objects.equals(ingamePlayerData.getPlayerId(), userId))
                .findFirst()
                .orElse(null);
        if (playerData == null) {
            log.error("turnActionBuyCard - System error - {} {}", gameId, userId);
            return R.failed("System error");
        }
        if (playerData.getGold() + playerData.getOnyx() + playerData.getRuby() + playerData.getEmerald() + playerData.getSapphire() + playerData.getDiamond() +
                gold + onyx + ruby + emerald + sapphire + diamond > 10) {
            return R.failed("You have more than 10 gem and gold");
        }

        // Update db
        splendorGame = splendorGameRepository.gatherGem(gameId, userId, gold, onyx, ruby, emerald, sapphire, diamond);
        if (splendorGame == null) {
            log.error("turnActionGatherGem - Invalid request - {} {} {} {} {} {} {}", gameId, userId, onyx, ruby, emerald, sapphire, diamond);
            return R.failed("Invalid request");
        }

        // Notify all user in game
        SplendorGame finalSplendorGame = splendorGame;
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), "", new HashMap<>() {
            {
                put("service_type", ServiceConstants.SERVICE_GAME_SPLENDOR);
                put("event_type", GameConstants.EVENT_TURN_ACTION_GATHER_GEM);
                put("game_id", finalSplendorGame.getGameId());
                put("room_id", finalSplendorGame.getRoomId());
                put("player_id", userId);
                put("round", finalSplendorGame.getIngameData().getRound());
                put("turn", finalSplendorGame.getIngameData().getTurn());
                put("current_player", finalSplendorGame.getIngameData().getCurrentPlayer());
                put("next_player", finalSplendorGame.getIngameData().getNextPlayer());
                put("gold", gold);
                put("onyx", onyx);
                put("ruby", ruby);
                put("emerald", emerald);
                put("sapphire", sapphire);
                put("diamond", diamond);
            }
        });

        return R.ok();
    }

    @Override
    public R<?> turnActionBuyCard(String userId, String gameId, TurnActionBuyCardRequest body) {
        int gold = body.getGold() == null ? 0 : body.getGold();
        int onyx = body.getOnyx() == null ? 0 : body.getOnyx();
        int ruby = body.getRuby() == null ? 0 : body.getRuby();
        int emerald = body.getEmerald() == null ? 0 : body.getEmerald();
        int sapphire = body.getSapphire() == null ? 0 : body.getSapphire();
        int diamond = body.getDiamond() == null ? 0 : body.getDiamond();
        if (gold > 0 || onyx > 0 || ruby > 0 || emerald > 0 || sapphire > 0 || diamond > 0) {
            return R.failed("Have to pay gem to buy card");
        }

        // Get from db
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("turnActionBuyCard - User not in game - {} {}", gameId, userId);
            return R.failed("User not in game");
        }
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                log.error("turnActionBuyCard - Game not start - {} {}", gameId, userId);
                return R.failed("Game not start");
            case GameConstants.STATUS_PLAY:
                break;
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }

        // Player data ingame
        IngamePlayerData playerData = splendorGame.getIngameData().getPlayers().stream()
                .filter(ingamePlayerData -> Objects.equals(ingamePlayerData.getPlayerId(), userId))
                .findFirst()
                .orElse(null);
        if (playerData == null) {
            log.error("turnActionBuyCard - System error - {} {}", gameId, userId);
            return R.failed("System error");
        }
        if (playerData.getGold() < -gold ||
                playerData.getOnyx() < -onyx ||
                playerData.getRuby() < -ruby ||
                playerData.getEmerald() < -emerald ||
                playerData.getSapphire() < -sapphire ||
                playerData.getDiamond() < -diamond) {
            log.error("turnActionBuyCard - Resource not enough to buy card - {} {} {} {}", gameId, userId, playerData, body);
            return R.failed("Resource not enough to buy card");
        }

        // Get config in game
        Card cardData = splendorGame.getConfig().getCards().stream()
                .filter(card -> Objects.equals(card.getId(), body.getCardId()))
                .findFirst()
                .orElse(null);
        if (cardData == null) {
            log.error("turnActionBuyCard - Invalid card - {} {} {}", gameId, userId, body.getCardId());
            return R.failed("Invalid card");
        }
        CardCost cardCost = cardData.getCost();
        Map<String, Integer> mapCardBuy = playerData.getCards().stream().collect(Collectors.toMap(Card::getType, card -> 1, Integer::sum));
        if ((cardCost.getOnyx() > mapCardBuy.getOrDefault(GameConstants.GEM_TYPE_ONYX, 0) + -onyx + -gold) ||
                (cardCost.getRuby() > mapCardBuy.getOrDefault(GameConstants.GEM_TYPE_RUBY, 0) + -ruby + -gold ) ||
                (cardCost.getEmerald() > mapCardBuy.getOrDefault(GameConstants.GEM_TYPE_EMERALD, 0) + -emerald + -gold ) ||
                (cardCost.getSapphire() > mapCardBuy.getOrDefault(GameConstants.GEM_TYPE_SAPPHIRE, 0) + -sapphire + -gold) ||
                (cardCost.getDiamond() > mapCardBuy.getOrDefault(GameConstants.GEM_TYPE_DIAMOND, 0) + -diamond + -gold)) {
            log.error("turnActionBuyCard - Resource not enough to buy card - {} {} {} {} {}", gameId, userId, playerData, cardCost, body);
            return R.failed("Resource not enough to buy card");
        }

        // Check card can buy
        List<Card> reserveCards = playerData.getReserveCards().stream()
                .filter(card -> Objects.equals(card.getId(), body.getCardId()))
                .toList();
        List<FieldCard> fieldCards1 = splendorGame.getIngameData().getFieldCard1().stream()
                .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), body.getCardId()))
                .toList();
        List<FieldCard> fieldCards2 = splendorGame.getIngameData().getFieldCard2().stream()
                .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), body.getCardId()))
                .toList();
        List<FieldCard> fieldCards3 = splendorGame.getIngameData().getFieldCard3().stream()
                .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), body.getCardId()))
                .toList();
        if (reserveCards.isEmpty() && fieldCards1.isEmpty() && fieldCards2.isEmpty() && fieldCards3.isEmpty()) {
            log.error("turnActionBuyCard - Card buy not found - {} {} {} {}", gameId, userId, body.getCardId(), splendorGame.getIngameData());
            return R.failed("Card buy not found");
        }
        if (!reserveCards.isEmpty()) {
            splendorGame = splendorGameRepository.buyCardInHand(gameId, userId, body.getCardId(), gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy reserve card error - {} {} {}", gameId, userId, body);
                return R.failed("Buy reserve card error");
            }
        } else if (!fieldCards1.isEmpty()) {
            splendorGame = splendorGameRepository.buyCardFieldLevel1(gameId, userId, body.getCardId(), gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy field card level 1 error - {} {} {}", gameId, userId, body);
                return R.failed("Buy field card level 1 error");
            }
        } else if (!fieldCards2.isEmpty()) {
            splendorGame = splendorGameRepository.buyCardFieldLevel2(gameId, userId, body.getCardId(), gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy field card level 2 error - {} {} {}", gameId, userId, body);
                return R.failed("Buy field card level 2 error");
            }
        } else {
            splendorGame = splendorGameRepository.buyCardFieldLevel3(gameId, userId, body.getCardId(), gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy field card level 3 error - {} {} {}", gameId, userId, body);
                return R.failed("Buy field card level 3 error");
            }
        }

        // Notify all user in game
        SplendorGame finalSplendorGame = splendorGame;
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), "", new HashMap<>() {
            {
                put("service_type", ServiceConstants.SERVICE_GAME_SPLENDOR);
                put("event_type", GameConstants.EVENT_TURN_ACTION_BUY_CARD);
                put("game_id", finalSplendorGame.getGameId());
                put("room_id", finalSplendorGame.getRoomId());
                put("player_id", userId);
                put("round", finalSplendorGame.getIngameData().getRound());
                put("turn", finalSplendorGame.getIngameData().getTurn());
                put("current_player", finalSplendorGame.getIngameData().getCurrentPlayer());
                put("next_player", finalSplendorGame.getIngameData().getNextPlayer());
                put("card_id", body.getCardId());
                put("gold", gold);
                put("onyx", onyx);
                put("ruby", ruby);
                put("emerald", emerald);
                put("sapphire", sapphire);
                put("diamond", diamond);
            }
        });

        return R.ok();
    }

    @Override
    public R<?> turnActionReserveCard(String userId, String gameId, TurnActionReserveCardRequest body) {
        int countReserveDeck1 = body.getDesk1() == null ? 0 : body.getDesk1();
        int countReserveDeck2 = body.getDesk2() == null ? 0 : body.getDesk2();
        int countReserveDeck3 = body.getDesk3() == null ? 0 : body.getDesk3();
        int countFieldCard = body.getCardId() == null ? 0 : 1;
        int gold = body.getGold() == null ? 0 : body.getGold();

        if (countReserveDeck1 + countReserveDeck2 + countReserveDeck3 + countFieldCard != 1) {
            log.error("turnActionReserveCard - Reserve card break rule game - {} {} {}", gameId, userId, body);
            return R.failed("Reserve card break rule game");
        }

        // Get from db
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("turnActionReserveCard - User not in game - {} {}", gameId, userId);
            return R.failed("User not in game");
        }
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                log.error("turnActionReserveCard - Game not start - {} {}", gameId, userId);
                return R.failed("Game not start");
            case GameConstants.STATUS_PLAY:
                break;
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }
        if (countReserveDeck1 > 0 && splendorGame.getIngameData().getDeckCard1().size() < countReserveDeck1) {
            log.error("turnActionReserveCard - Deck card 1 not have enough card - {} {} {} {}", gameId, userId, countReserveDeck1, splendorGame.getIngameData().getDeckCard1());
            return R.failed("Deck card 1 not have enough card");
        }
        if (countReserveDeck2 > 0 && splendorGame.getIngameData().getDeckCard2().size() < countReserveDeck2) {
            log.error("turnActionReserveCard - Deck card 2 not have enough card - {} {} {} {}", gameId, userId, countReserveDeck1, splendorGame.getIngameData().getDeckCard1());
            return R.failed("Deck card 2 not have enough card");
        }
        if (countReserveDeck3 > 0 && splendorGame.getIngameData().getDeckCard3().size() < countReserveDeck3) {
            log.error("turnActionReserveCard - Deck card 3 not have enough card - {} {} {} {}", gameId, userId, countReserveDeck1, splendorGame.getIngameData().getDeckCard1());
            return R.failed("Deck card 3 not have enough card");
        }
        if (splendorGame.getIngameData().getGold() < gold) {
            log.error("turnActionReserveCard - Out of gold - {} {} {} {}", gameId, userId, splendorGame.getIngameData().getGold(), gold);
            return R.failed("Out of gold");
        }

        // Get config in game
        Card cardData = splendorGame.getConfig().getCards().stream()
                .filter(card -> Objects.equals(card.getId(), body.getCardId()))
                .findFirst()
                .orElse(null);
        if (cardData == null) {
            log.error("turnActionReserveCard - Invalid card - {} {} {}", gameId, userId, body.getCardId());
            return R.failed("Invalid card");
        }

        // Player data ingame
        IngamePlayerData playerData = splendorGame.getIngameData().getPlayers().stream()
                .filter(ingamePlayerData -> Objects.equals(ingamePlayerData.getPlayerId(), userId))
                .findFirst()
                .orElse(null);
        if (playerData == null) {
            log.error("turnActionReserveCard - System error - {} {}", gameId, userId);
            return R.failed("System error");
        }
        if (playerData.getReserveCards().size() + countReserveDeck1 + countReserveDeck2 + countReserveDeck3 + countFieldCard > 3) {
            log.error("turnActionReserveCard - Hand limit 3 - {} {} {}", gameId, userId, playerData);
            return R.failed("Hand limit 3");
        }

        //
        String cardIdDeck1 = null;
        if (countReserveDeck1 > 0) {
            cardIdDeck1 = splendorGame.getIngameData().getDeckCard1().get(0).getId();
            splendorGame = splendorGameRepository.reserveCardDeck1(gameId, userId, cardIdDeck1, gold);
            if (splendorGame == null) {
                log.error("turnActionReserveCard - Reserve card deck 1 error - {} {} {}", gameId, userId, body);
                return R.failed("Reserve card deck 1 error");
            }
        }
        String cardIdDeck2 = null;
        if (countReserveDeck2 > 0) {
            cardIdDeck2 = splendorGame.getIngameData().getDeckCard2().get(0).getId();
            splendorGame = splendorGameRepository.reserveCardDeck2(gameId, userId, cardIdDeck2, gold);
            if (splendorGame == null) {
                log.error("turnActionReserveCard - Reserve card deck 2 error - {} {} {}", gameId, userId, body);
                return R.failed("Reserve card deck 2 error");
            }
        }
        String cardIdDeck3 = null;
        if (countReserveDeck3 > 0) {
            cardIdDeck3 = splendorGame.getIngameData().getDeckCard3().get(0).getId();
            splendorGame = splendorGameRepository.reserveCardDeck3(gameId, userId, cardIdDeck3, gold);
            if (splendorGame == null) {
                log.error("turnActionReserveCard - Reserve card deck 3 error - {} {} {}", gameId, userId, body);
                return R.failed("Reserve card deck 3 error");
            }
        }
        String cardIdField1 = null;
        String cardIdField2 = null;
        String cardIdField3 = null;
        if (countFieldCard > 0) {
            cardIdField1 = splendorGame.getIngameData().getFieldCard1().stream()
                    .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), body.getCardId()))
                    .map(fieldCard -> fieldCard.getCard().getId())
                    .findFirst()
                    .orElse(null);
            if (cardIdField1 != null) {
                splendorGame = splendorGameRepository.reserveCardField1(gameId, userId, cardIdField1, gold);
                if (splendorGame == null) {
                    log.error("turnActionReserveCard - Reserve card field 1 error - {} {} {}", gameId, userId, body);
                    return R.failed("Reserve card field 1 error");
                }
            }
            cardIdField2 = splendorGame.getIngameData().getFieldCard2().stream()
                    .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), body.getCardId()))
                    .map(fieldCard -> fieldCard.getCard().getId())
                    .findFirst()
                    .orElse(null);
            if (cardIdField2 != null) {
                splendorGame = splendorGameRepository.reserveCardField2(gameId, userId, cardIdField2, gold);
                if (splendorGame == null) {
                    log.error("turnActionReserveCard - Reserve card field 2 error - {} {} {}", gameId, userId, body);
                    return R.failed("Reserve card field 2 error");
                }
            }
            cardIdField3 = splendorGame.getIngameData().getFieldCard3().stream()
                    .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), body.getCardId()))
                    .map(fieldCard -> fieldCard.getCard().getId())
                    .findFirst()
                    .orElse(null);
            if (cardIdField3 != null) {
                splendorGame = splendorGameRepository.reserveCardField3(gameId, userId, cardIdField3, gold);
                if (splendorGame == null) {
                    log.error("turnActionReserveCard - Reserve card field 2 error - {} {} {}", gameId, userId, body);
                    return R.failed("Reserve card field 2 error");
                }
            }
        }

        if (countReserveDeck1 <= 0 &&
                countReserveDeck2 <= 0 &&
                countReserveDeck3 <= 0 && (cardIdField1 == null || cardIdField2 == null || cardIdField3 == null)) {
            log.error("turnActionReserveCard - Card reverse not found - {} {} {} {}", gameId, userId, body.getCardId(), splendorGame.getIngameData());
        }

        // Notify all user in game
        SplendorGame finalSplendorGame = splendorGame;
        List<String> deckCard1 = cardIdDeck1 == null ? new ArrayList<>() : List.of(cardIdDeck1);
        List<String> deckCard2 = cardIdDeck2 == null ? new ArrayList<>() : List.of(cardIdDeck2);
        List<String> deckCard3 = cardIdDeck3 == null ? new ArrayList<>() : List.of(cardIdDeck3);
        List<String> fieldCard1 = cardIdField1 == null ? new ArrayList<>() : List.of(cardIdField1);
        List<String> fieldCard2 = cardIdField2 == null ? new ArrayList<>() : List.of(cardIdField2);
        List<String> fieldCard3 = cardIdField3 == null ? new ArrayList<>() : List.of(cardIdField3);
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), "", new HashMap<>() {
            {
                put("service_type", ServiceConstants.SERVICE_GAME_SPLENDOR);
                put("event_type", GameConstants.EVENT_TURN_ACTION_RESERVE_CARD);
                put("game_id", finalSplendorGame.getGameId());
                put("room_id", finalSplendorGame.getRoomId());
                put("player_id", userId);
                put("round", finalSplendorGame.getIngameData().getRound());
                put("turn", finalSplendorGame.getIngameData().getTurn());
                put("current_player", finalSplendorGame.getIngameData().getCurrentPlayer());
                put("next_player", finalSplendorGame.getIngameData().getNextPlayer());
                put("card_id", body.getCardId());
                put("deck_card_1", deckCard1);
                put("deck_card_2", deckCard2);
                put("deck_card_3", deckCard3);
                put("field_card_1", fieldCard1);
                put("field_card_2", fieldCard2);
                put("field_card_3", fieldCard3);
            }
        });

        return R.ok();
    }

    @Override
    public R<?> turnBonusActionTakeNoble(String userId, String gameId, TurnBonusActionTakeNobleRequest body) {
        // Get from db
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("turnBonusActionTakeNoble - User not in game - {} {}", gameId, userId);
            return R.failed("User not in game");
        }
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                log.error("turnBonusActionTakeNoble - Game not start - {} {}", gameId, userId);
                return R.failed("Game not start");
            case GameConstants.STATUS_PLAY:
                break;
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }

        // Get config in game
        Noble nobleData = splendorGame.getConfig().getNobles().stream()
                .filter(noble -> Objects.equals(noble.getId(), body.getNobleId()))
                .findFirst()
                .orElse(null);
        if (nobleData == null) {
            log.error("turnBonusActionTakeNoble - Invalid noble - {} {} {}", gameId, userId, body.getNobleId());
            return R.failed("Invalid noble");
        }

        // Player data ingame
        IngamePlayerData playerData = splendorGame.getIngameData().getPlayers().stream()
                .filter(ingamePlayerData -> Objects.equals(ingamePlayerData.getPlayerId(), userId))
                .findFirst()
                .orElse(null);
        if (playerData == null) {
            log.error("turnActionReserveCard - System error - {} {}", gameId, userId);
            return R.failed("System error");
        }

        if (splendorGame.getIngameData().getFieldNoble().stream()
                .noneMatch(fieldNoble -> fieldNoble.getNoble() != null && Objects.equals(fieldNoble.getNoble().getId(), body.getNobleId()))) {
            log.error("turnBonusActionTakeNoble - Noble not found - {} {} {} {}", gameId, userId, body.getNobleId(), splendorGame.getIngameData());
            return R.failed("Noble not found");
        }

        Map<String, Long> mapCardCount = playerData.getCards().stream().collect(Collectors.groupingBy(Card::getType, Collectors.counting()));
        if (mapCardCount.get(GameConstants.GEM_TYPE_ONYX) < nobleData.getCost().getCard0nyx() ||
                mapCardCount.get(GameConstants.GEM_TYPE_RUBY) < nobleData.getCost().getCardRuby() ||
                mapCardCount.get(GameConstants.GEM_TYPE_EMERALD) < nobleData.getCost().getCardEmerald() ||
                mapCardCount.get(GameConstants.GEM_TYPE_SAPPHIRE) < nobleData.getCost().getCardSapphire() ||
                mapCardCount.get(GameConstants.GEM_TYPE_DIAMOND) < nobleData.getCost().getCardDiamond()) {
            log.error("turnBonusActionTakeNoble - Not enough condition take noble - {} {} {} {}", gameId, userId, body.getNobleId(), playerData);
            return R.failed("Not enough condition take noble");
        }

        //
        splendorGame = splendorGameRepository.takeNoble(gameId, userId, body.getNobleId());
        if (splendorGame == null) {
            log.error("turnBonusActionTakeNoble - Take noble error - {} {} {}", gameId, userId, body.getNobleId());
            return R.failed("Take noble error");
        }

        // Notify all user in game
        SplendorGame finalSplendorGame = splendorGame;
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), "", new HashMap<>() {
            {
                put("service_type", ServiceConstants.SERVICE_GAME_SPLENDOR);
                put("event_type", GameConstants.EVENT_TURN_BONUS_ACTION_TAKE_NOBLE);
                put("game_id", finalSplendorGame.getGameId());
                put("room_id", finalSplendorGame.getRoomId());
                put("player_id", userId);
                put("round", finalSplendorGame.getIngameData().getRound());
                put("turn", finalSplendorGame.getIngameData().getTurn());
                put("current_player", finalSplendorGame.getIngameData().getCurrentPlayer());
                put("next_player", finalSplendorGame.getIngameData().getNextPlayer());
                put("noble", body.getNobleId());
            }
        });

        return R.ok();
    }

}
