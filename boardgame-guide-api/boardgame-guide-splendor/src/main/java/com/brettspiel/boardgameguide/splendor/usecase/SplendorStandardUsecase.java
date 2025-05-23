package com.brettspiel.boardgameguide.splendor.usecase;

import cn.hutool.core.util.StrUtil;
import com.brettspiel.assist.SocketAssist;
import com.brettspiel.boardgameguide.constant.ServiceConstants;
import com.brettspiel.boardgameguide.splendor.constant.GameConstants;
import com.brettspiel.boardgameguide.splendor.dto.PlayerDTO;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import com.brettspiel.boardgameguide.splendor.entity.vo.*;
import com.brettspiel.boardgameguide.splendor.mapper.GameMapper;
import com.brettspiel.boardgameguide.splendor.repository.ISplendorGameRepository;
import com.brettspiel.boardgameguide.splendor.utils.GameUtils;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGameConfig;
import com.brettspiel.utils.IdGenerator;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Created by Quach Thanh Phong
 * On 5/20/2025 - 11:45 AM
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class SplendorStandardUsecase extends BaseSplendorUsecase<SplendorGame> {

    private final ISplendorGameRepository splendorGameRepository;

    private final GameMapper gameMapper;

    private final SocketAssist socketAssist;

    private final GameUtils gameUtils;


    @Override
    public SplendorGame initGame(String roomId, List<PlayerDTO> players, Map<String, Object> setup) {
        // Get card data from config
        int numberPlayer = players.size();
        SplendorGameConfig splendorGameConfig = gameUtils.getGameConfig(numberPlayer);
        if (splendorGameConfig == null) {
            log.error("initGame - Config splendor not found - {}", numberPlayer);
            throw new RuntimeException(StrUtil.format("initGame - Config splendor not found - {}", numberPlayer));
        }

        // Save game to db
        SplendorGame splendorGame = SplendorGame.builder()
                .gameId(IdGenerator.nextObjectId())
                .roomId(roomId)
                .players(players.stream().map(gameMapper::toPlayerInfo).toList())
                .status(GameConstants.STATUS_INIT)
                .config(splendorGameConfig)
                .build();
        return splendorGameRepository.insert(splendorGame);
    }

    @Override
    public R<?> startGame(SplendorGame splendorGame) {
        String gameId = splendorGame.getGameId();

        // Clone data
        List<String> playerIds = new ArrayList<>(splendorGame.getPlayers().stream()
                .map(PlayerInfo::getId)
                .toList());
        List<Noble> nobles = new ArrayList<>(splendorGame.getConfig().getNobles().stream()
                .map(noble -> noble.toBuilder().build())
                .toList());
        List<Card> cards = new ArrayList<>(splendorGame.getConfig().getCards().stream()
                .map(card -> card.toBuilder().build())
                .toList());

        // Shuffle data
        Collections.shuffle(playerIds);
        Collections.shuffle(nobles);
        Collections.shuffle(cards);

        //
        int openNoble = splendorGame.getConfig().getNoble();
        int openCard = 4;
        List<Card> cards1 = cards.stream().filter(card -> card.getLevel() == 1).toList();
        List<Card> cards2 = cards.stream().filter(card -> card.getLevel() == 2).toList();
        List<Card> cards3 = cards.stream().filter(card -> card.getLevel() == 3).toList();
        IngameData ingameData = IngameData.builder()
                .playerIds(playerIds)
                .currentPlayer(playerIds.get(0))
                .nextPlayer(playerIds.get(1))
                .deckNoble(nobles.stream().skip(openNoble).toList())
                .fieldNoble(IntStream.range(0, openNoble)
                        .mapToObj(number -> FieldNoble.builder()
                                .position(number)
                                .noble(nobles.get(number))
                                .build())
                        .toList())
                .deckCard1(cards1.stream().skip(openCard).toList())
                .fieldCard1(IntStream.range(0, openCard)
                        .mapToObj(number -> FieldCard.builder()
                                .position(number)
                                .card(cards1.get(number))
                                .build())
                        .toList())
                .deckCard2(cards2.stream().skip(openCard).toList())
                .fieldCard2(IntStream.range(0, openCard)
                        .mapToObj(number -> FieldCard.builder()
                                .position(number)
                                .card(cards2.get(number))
                                .build())
                        .toList())
                .deckCard3(cards3.stream().skip(openCard).toList())
                .fieldCard3(IntStream.range(0, openCard)
                        .mapToObj(number -> FieldCard.builder()
                                .position(number)
                                .card(cards3.get(number))
                                .build())
                        .toList())
                .gold(splendorGame.getConfig().getGold())
                .onyx(splendorGame.getConfig().getOnyx())
                .ruby(splendorGame.getConfig().getRuby())
                .emerald(splendorGame.getConfig().getEmerald())
                .sapphire(splendorGame.getConfig().getSapphire())
                .diamond(splendorGame.getConfig().getDiamond())
                .players(playerIds.stream()
                        .map(playerId -> IngamePlayerData.builder()
                                .playerId(playerId)
                                .build())
                        .toList())
                .build();

        // Save to db
        SplendorGame splendorGameAlter = splendorGameRepository.startGame(gameId, ingameData);
        if (splendorGameAlter == null) {
            log.warn("startGame - Game have started - {}", gameId);
            return R.ok("Game have started");
        }

        // Notify to all user in game
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), "", new HashMap<>() {
            {
                put("service_type", ServiceConstants.SERVICE_GAME_SPLENDOR);
                put("event_type", GameConstants.EVENT_START_GAME);
                put("game_id", splendorGameAlter.getGameId());
                put("room_id", splendorGameAlter.getRoomId());
                put("status", splendorGameAlter.getStatus());
                put("player_ids", splendorGameAlter.getIngameData().getPlayerIds());
                put("round", splendorGameAlter.getIngameData().getRound());
                put("turn", splendorGameAlter.getIngameData().getTurn());
                put("current_player", splendorGameAlter.getIngameData().getCurrentPlayer());
                put("next_player", splendorGameAlter.getIngameData().getNextPlayer());
                put("field_noble", splendorGameAlter.getIngameData().getFieldNoble());
                put("field_card_1", splendorGameAlter.getIngameData().getFieldCard1());
                put("field_card_2", splendorGameAlter.getIngameData().getFieldCard2());
                put("field_card_3", splendorGameAlter.getIngameData().getFieldCard3());
            }
        });

        return R.ok();
    }

    @Override
    public R<?> endTurn(String currentPlayer, SplendorGame splendorGame) {
        String gameId = splendorGame.getGameId();

        // Update turn in db
        SplendorGame splendorGameAlter = splendorGameRepository.endTurn(gameId, currentPlayer);
        if (splendorGameAlter == null) {
            log.error("endTurn - End turn not current player - {} {}", gameId, currentPlayer);
            return R.failed("This is not your turn");
        }

        // Notify all user in game
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), "", new HashMap<>() {
            {
                put("service_type", ServiceConstants.SERVICE_GAME_SPLENDOR);
                put("event_type", GameConstants.EVENT_END_TURN);
                put("game_id", splendorGameAlter.getGameId());
                put("room_id", splendorGameAlter.getRoomId());
                put("round", splendorGameAlter.getIngameData().getRound());
                put("turn", splendorGameAlter.getIngameData().getTurn());
                put("current_player", splendorGameAlter.getIngameData().getCurrentPlayer());
                put("next_player", splendorGameAlter.getIngameData().getNextPlayer());
            }
        });

        return R.ok();
    }

    @Override
    public R<?> turnActionGatherGem(String currentPlayer, SplendorGame splendorGame, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond) {
        String gameId = splendorGame.getGameId();

        // Player data
        IngamePlayerData playerData = splendorGame.getIngameData().getPlayers().stream()
                .filter(ingamePlayerData -> Objects.equals(ingamePlayerData.getPlayerId(), currentPlayer))
                .findFirst()
                .orElse(null);
        if (playerData == null) {
            log.error("turnActionBuyCard - Player not found - {} {}", splendorGame.getGameId(), currentPlayer);
            return R.failed("Player not found");
        }

        // Verify rule
        if (gold + onyx + ruby + emerald + sapphire + diamond > 3) {
            return R.failed("Gather gem max 3 gem");
        }
        if (onyx > 2 || ruby > 2 || emerald > 2 || sapphire > 2 || diamond > 2) {
            return R.failed("Gather gem max 2 same gem");
        }
        if ((splendorGame.getIngameData().getOnyx() < 4 && onyx == 2) ||
                (splendorGame.getIngameData().getRuby() < 4 && ruby == 2) ||
                (splendorGame.getIngameData().getEmerald() < 4 && emerald == 2) ||
                (splendorGame.getIngameData().getSapphire() < 4 && sapphire == 2) ||
                (splendorGame.getIngameData().getDiamond() < 4 && diamond == 2)) {
            return R.failed("Gather gem break rule game");
        }
        if (playerData.getGold() + playerData.getOnyx() + playerData.getRuby() + playerData.getEmerald() + playerData.getSapphire() + playerData.getDiamond() +
                gold + onyx + ruby + emerald + sapphire + diamond > 10) {
            return R.failed("You have more than 10 gem and gold");
        }

        // Update db
        SplendorGame splendorGameAlter = splendorGameRepository.gatherGem(gameId, currentPlayer, gold, onyx, ruby, emerald, sapphire, diamond);
        if (splendorGameAlter == null) {
            log.error("turnActionGatherGem - Invalid request - {} {} {} {} {} {} {}", gameId, currentPlayer, onyx, ruby, emerald, sapphire, diamond);
            return R.failed("Invalid request");
        }

        // Notify all user in game
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), "", new HashMap<>() {
            {
                put("service_type", ServiceConstants.SERVICE_GAME_SPLENDOR);
                put("event_type", GameConstants.EVENT_TURN_ACTION_GATHER_GEM);
                put("game_id", splendorGameAlter.getGameId());
                put("room_id", splendorGameAlter.getRoomId());
                put("current_player", splendorGameAlter.getIngameData().getCurrentPlayer());
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
    public R<?> turnActionBuyCard(String currentPlayer, SplendorGame splendorGame, String cardId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond) {
        String gameId = splendorGame.getGameId();

        // Player data
        IngamePlayerData playerData = splendorGame.getIngameData().getPlayers().stream()
                .filter(ingamePlayerData -> Objects.equals(ingamePlayerData.getPlayerId(), currentPlayer))
                .findFirst()
                .orElse(null);
        if (playerData == null) {
            log.error("turnActionBuyCard - Player not found - {} {}", gameId, currentPlayer);
            return R.failed("Player not found");
        }

        // Card config
        Card cardData = splendorGame.getConfig().getCards().stream()
                .filter(card -> Objects.equals(card.getId(), cardId))
                .findFirst()
                .orElse(null);
        if (cardData == null) {
            log.error("turnActionBuyCard - Invalid card - {} {} {}", gameId, currentPlayer, cardId);
            return R.failed("Invalid card");
        }

        // Check have resource
        if (playerData.getGold() < -gold ||
                playerData.getOnyx() < -onyx ||
                playerData.getRuby() < -ruby ||
                playerData.getEmerald() < -emerald ||
                playerData.getSapphire() < -sapphire ||
                playerData.getDiamond() < -diamond) {
            log.error("turnActionBuyCard - Resource not enough to buy card - {} {} {} {} {} {} {} {} {}", gameId, currentPlayer, playerData, gold, onyx, ruby, emerald, sapphire, diamond);
            return R.failed("Resource not enough to buy card");
        }

        // Check resource and cost
        CardCost cardCost = cardData.getCost();
        Map<String, Integer> mapCardBuy = playerData.getCards().stream().collect(Collectors.toMap(Card::getType, card -> 1, Integer::sum));
        if ((cardCost.getOnyx() > mapCardBuy.getOrDefault(GameConstants.GEM_TYPE_ONYX, 0) + -onyx + -gold) ||
                (cardCost.getRuby() > mapCardBuy.getOrDefault(GameConstants.GEM_TYPE_RUBY, 0) + -ruby + -gold ) ||
                (cardCost.getEmerald() > mapCardBuy.getOrDefault(GameConstants.GEM_TYPE_EMERALD, 0) + -emerald + -gold ) ||
                (cardCost.getSapphire() > mapCardBuy.getOrDefault(GameConstants.GEM_TYPE_SAPPHIRE, 0) + -sapphire + -gold) ||
                (cardCost.getDiamond() > mapCardBuy.getOrDefault(GameConstants.GEM_TYPE_DIAMOND, 0) + -diamond + -gold)) {
            log.error("turnActionBuyCard - Resource not enough to buy card - {} {} {} {}", gameId, currentPlayer, playerData, cardCost);
            return R.failed("Resource not enough to buy card");
        }

        // Check card can buy
        List<Card> reserveCards = playerData.getReserveCards().stream()
                .filter(card -> Objects.equals(card.getId(), cardId))
                .toList();
        List<FieldCard> fieldCards1 = splendorGame.getIngameData().getFieldCard1().stream()
                .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), cardId))
                .toList();
        List<FieldCard> fieldCards2 = splendorGame.getIngameData().getFieldCard2().stream()
                .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), cardId))
                .toList();
        List<FieldCard> fieldCards3 = splendorGame.getIngameData().getFieldCard3().stream()
                .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), cardId))
                .toList();
        if (reserveCards.isEmpty() && fieldCards1.isEmpty() && fieldCards2.isEmpty() && fieldCards3.isEmpty()) {
            log.error("turnActionBuyCard - Card buy not found - {} {} {} {}", gameId, currentPlayer, cardId, splendorGame.getIngameData());
            return R.failed("Card buy not found");
        }
        if (!reserveCards.isEmpty()) {
            splendorGame = splendorGameRepository.buyCardInHand(gameId, currentPlayer, cardId, gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy reserve card error - {} {} {} {} {} {} {} {} {}", gameId, currentPlayer, cardId, gold, onyx, ruby, emerald, sapphire, diamond);
                return R.failed("Buy reserve card error");
            }
        } else if (!fieldCards1.isEmpty()) {
            splendorGame = splendorGameRepository.buyCardFieldLevel1(gameId, currentPlayer, cardId, gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy field card level 1 error - {} {} {} {} {} {} {} {} {}", gameId, currentPlayer, cardId, gold, onyx, ruby, emerald, sapphire, diamond);
                return R.failed("Buy field card level 1 error");
            }
        } else if (!fieldCards2.isEmpty()) {
            splendorGame = splendorGameRepository.buyCardFieldLevel2(gameId, currentPlayer, cardId, gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy field card level 2 error - {} {} {} {} {} {} {} {} {}", gameId, currentPlayer, cardId, gold, onyx, ruby, emerald, sapphire, diamond);
                return R.failed("Buy field card level 2 error");
            }
        } else {
            splendorGame = splendorGameRepository.buyCardFieldLevel3(gameId, currentPlayer, cardId, gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy field card level 3 error - {} {} {} {} {} {} {} {} {}", gameId, currentPlayer, cardId, gold, onyx, ruby, emerald, sapphire, diamond);
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
                put("current_player", finalSplendorGame.getIngameData().getCurrentPlayer());
                put("card_id", cardId);
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
    public R<?> turnActionReserveCard(String currentPlayer, SplendorGame splendorGame, int desk1, int desk2, int desk3, String cardId, int gold) {
        String gameId = splendorGame.getGameId();

        // Player data
        IngamePlayerData playerData = splendorGame.getIngameData().getPlayers().stream()
                .filter(ingamePlayerData -> Objects.equals(ingamePlayerData.getPlayerId(), currentPlayer))
                .findFirst()
                .orElse(null);
        if (playerData == null) {
            log.error("turnActionReserveCard - System error - {} {}", gameId, currentPlayer);
            return R.failed("System error");
        }

        // Card config
        Card cardData = splendorGame.getConfig().getCards().stream()
                .filter(card -> Objects.equals(card.getId(), cardId))
                .findFirst()
                .orElse(null);
        if (cardData == null) {
            log.error("turnActionReserveCard - Invalid card - {} {} {}", gameId, currentPlayer, cardId);
            return R.failed("Invalid card");
        }

        // Verify
        if (desk1 > 0 && splendorGame.getIngameData().getDeckCard1().size() < desk1) {
            log.error("turnActionReserveCard - Deck card 1 not have enough card - {} {} {} {}", gameId, currentPlayer, desk1, splendorGame.getIngameData().getDeckCard1());
            return R.failed("Deck card 1 not have enough card");
        }
        if (desk2 > 0 && splendorGame.getIngameData().getDeckCard2().size() < desk2) {
            log.error("turnActionReserveCard - Deck card 2 not have enough card - {} {} {} {}", gameId, currentPlayer, desk2, splendorGame.getIngameData().getDeckCard1());
            return R.failed("Deck card 2 not have enough card");
        }
        if (desk3 > 0 && splendorGame.getIngameData().getDeckCard3().size() < desk3) {
            log.error("turnActionReserveCard - Deck card 3 not have enough card - {} {} {} {}", gameId, currentPlayer, desk3, splendorGame.getIngameData().getDeckCard1());
            return R.failed("Deck card 3 not have enough card");
        }
        if (splendorGame.getIngameData().getGold() < gold) {
            log.error("turnActionReserveCard - Out of gold - {} {} {} {}", gameId, currentPlayer, splendorGame.getIngameData().getGold(), gold);
            return R.failed("Out of gold");
        }
        if (playerData.getReserveCards().size() + desk1 + desk2 + desk3 + (cardId == null ? 0 : 1) > 3) {
            log.error("turnActionReserveCard - Hand limit 3 - {} {} {}", gameId, currentPlayer, playerData);
            return R.failed("Hand limit 3");
        }

        //
        String cardIdDeck1 = null;
        if (desk1 > 0) {
            cardIdDeck1 = splendorGame.getIngameData().getDeckCard1().getFirst().getId();
            splendorGame = splendorGameRepository.reserveCardDeck1(gameId, currentPlayer, cardIdDeck1, gold);
            if (splendorGame == null) {
                log.error("turnActionReserveCard - Reserve card deck 1 error - {} {} {}", gameId, currentPlayer, desk1);
                return R.failed("Reserve card deck 1 error");
            }
        }
        String cardIdDeck2 = null;
        if (desk2 > 0) {
            cardIdDeck2 = splendorGame.getIngameData().getDeckCard2().getFirst().getId();
            splendorGame = splendorGameRepository.reserveCardDeck2(gameId, currentPlayer, cardIdDeck2, gold);
            if (splendorGame == null) {
                log.error("turnActionReserveCard - Reserve card deck 2 error - {} {} {}", gameId, currentPlayer, desk2);
                return R.failed("Reserve card deck 2 error");
            }
        }
        String cardIdDeck3 = null;
        if (desk3 > 0) {
            cardIdDeck3 = splendorGame.getIngameData().getDeckCard3().getFirst().getId();
            splendorGame = splendorGameRepository.reserveCardDeck3(gameId, currentPlayer, cardIdDeck3, gold);
            if (splendorGame == null) {
                log.error("turnActionReserveCard - Reserve card deck 3 error - {} {} {}", gameId, currentPlayer, desk3);
                return R.failed("Reserve card deck 3 error");
            }
        }
        String cardIdField1 = null;
        String cardIdField2 = null;
        String cardIdField3 = null;
        if (cardId != null) {
            cardIdField1 = splendorGame.getIngameData().getFieldCard1().stream()
                    .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), cardId))
                    .map(fieldCard -> fieldCard.getCard().getId())
                    .findFirst()
                    .orElse(null);
            if (cardIdField1 != null) {
                splendorGame = splendorGameRepository.reserveCardField1(gameId, currentPlayer, cardIdField1, gold);
                if (splendorGame == null) {
                    log.error("turnActionReserveCard - Reserve card field 1 error - {} {} {}", gameId, currentPlayer, cardId);
                    return R.failed("Reserve card field 1 error");
                }
            }
            cardIdField2 = splendorGame.getIngameData().getFieldCard2().stream()
                    .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), cardId))
                    .map(fieldCard -> fieldCard.getCard().getId())
                    .findFirst()
                    .orElse(null);
            if (cardIdField2 != null) {
                splendorGame = splendorGameRepository.reserveCardField2(gameId, currentPlayer, cardIdField2, gold);
                if (splendorGame == null) {
                    log.error("turnActionReserveCard - Reserve card field 2 error - {} {} {}", gameId, currentPlayer, cardId);
                    return R.failed("Reserve card field 2 error");
                }
            }
            cardIdField3 = splendorGame.getIngameData().getFieldCard3().stream()
                    .filter(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), cardId))
                    .map(fieldCard -> fieldCard.getCard().getId())
                    .findFirst()
                    .orElse(null);
            if (cardIdField3 != null) {
                splendorGame = splendorGameRepository.reserveCardField3(gameId, currentPlayer, cardIdField3, gold);
                if (splendorGame == null) {
                    log.error("turnActionReserveCard - Reserve card field 2 error - {} {} {}", gameId, currentPlayer, cardId);
                    return R.failed("Reserve card field 2 error");
                }
            }
        }

        if (desk1 <= 0 &&
                desk2 <= 0 &&
                desk3 <= 0 && (cardIdField1 == null || cardIdField2 == null || cardIdField3 == null)) {
            log.error("turnActionReserveCard - Card reverse not found - {} {} {} {}", gameId, currentPlayer, cardId, splendorGame.getIngameData());
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
                put("round", finalSplendorGame.getIngameData().getRound());
                put("turn", finalSplendorGame.getIngameData().getTurn());
                put("current_player", finalSplendorGame.getIngameData().getCurrentPlayer());
                put("next_player", finalSplendorGame.getIngameData().getNextPlayer());
                put("card_id", cardId);
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
    public R<?> turnBonusActionTakeNoble(String currentPlayer, SplendorGame splendorGame, String nobleId) {
        String gameId = splendorGame.getGameId();

        // Player data
        IngamePlayerData playerData = splendorGame.getIngameData().getPlayers().stream()
                .filter(ingamePlayerData -> Objects.equals(ingamePlayerData.getPlayerId(), currentPlayer))
                .findFirst()
                .orElse(null);
        if (playerData == null) {
            log.error("turnActionReserveCard - Player not found - {} {}", gameId, currentPlayer);
            return R.failed("Player not found");
        }

        // Noble config
        Noble nobleData = splendorGame.getConfig().getNobles().stream()
                .filter(noble -> Objects.equals(noble.getId(), nobleId))
                .findFirst()
                .orElse(null);
        if (nobleData == null) {
            log.error("turnBonusActionTakeNoble - Invalid noble - {} {} {}", gameId, currentPlayer, nobleId);
            return R.failed("Invalid noble");
        }

        if (splendorGame.getIngameData().getFieldNoble().stream()
                .noneMatch(fieldNoble -> fieldNoble.getNoble() != null && Objects.equals(fieldNoble.getNoble().getId(), nobleId))) {
            log.error("turnBonusActionTakeNoble - Noble not found - {} {} {} {}", gameId, currentPlayer, nobleId, splendorGame.getIngameData());
            return R.failed("Noble not found");
        }

        Map<String, Long> mapCardCount = playerData.getCards().stream().collect(Collectors.groupingBy(Card::getType, Collectors.counting()));
        if (mapCardCount.get(GameConstants.GEM_TYPE_ONYX) < nobleData.getCost().getCard0nyx() ||
                mapCardCount.get(GameConstants.GEM_TYPE_RUBY) < nobleData.getCost().getCardRuby() ||
                mapCardCount.get(GameConstants.GEM_TYPE_EMERALD) < nobleData.getCost().getCardEmerald() ||
                mapCardCount.get(GameConstants.GEM_TYPE_SAPPHIRE) < nobleData.getCost().getCardSapphire() ||
                mapCardCount.get(GameConstants.GEM_TYPE_DIAMOND) < nobleData.getCost().getCardDiamond()) {
            log.error("turnBonusActionTakeNoble - Not enough condition take noble - {} {} {} {}", gameId, currentPlayer, nobleId, playerData);
            return R.failed("Not enough condition take noble");
        }

        //
        SplendorGame splendorGameAlter = splendorGameRepository.takeNoble(gameId, currentPlayer, nobleId);
        if (splendorGameAlter == null) {
            log.error("turnBonusActionTakeNoble - Take noble error - {} {} {}", gameId, currentPlayer, nobleId);
            return R.failed("Take noble error");
        }

        // Notify all user in game
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), "", new HashMap<>() {
            {
                put("service_type", ServiceConstants.SERVICE_GAME_SPLENDOR);
                put("event_type", GameConstants.EVENT_TURN_BONUS_ACTION_TAKE_NOBLE);
                put("game_id", splendorGameAlter.getGameId());
                put("room_id", splendorGameAlter.getRoomId());
                put("current_player", splendorGameAlter.getIngameData().getCurrentPlayer());
                put("next_player", splendorGameAlter.getIngameData().getNextPlayer());
                put("noble_id", nobleId);
            }
        });

        return R.ok();
    }

}
