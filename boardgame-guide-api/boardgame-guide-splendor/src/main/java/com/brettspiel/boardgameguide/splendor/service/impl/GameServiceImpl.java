package com.brettspiel.boardgameguide.splendor.service.impl;

import cn.hutool.core.util.StrUtil;
import com.brettspiel.assist.SocketAssist;
import com.brettspiel.boardgameguide.splendor.constant.GameConstants;
import com.brettspiel.boardgameguide.splendor.controller.dto.request.StartGameRequest;
import com.brettspiel.boardgameguide.splendor.controller.dto.request.TurnActionBuyCardRequest;
import com.brettspiel.boardgameguide.splendor.controller.dto.request.TurnActionGatherGemRequest;
import com.brettspiel.boardgameguide.splendor.dto.SplendorGameDTO;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import com.brettspiel.boardgameguide.splendor.entity.SplendorTable;
import com.brettspiel.boardgameguide.splendor.entity.vo.*;
import com.brettspiel.boardgameguide.splendor.mapper.IGameMapper;
import com.brettspiel.boardgameguide.splendor.repository.ISplendorGameRepository;
import com.brettspiel.boardgameguide.splendor.repository.ISplendorTableRepository;
import com.brettspiel.boardgameguide.splendor.service.IGameService;
import com.brettspiel.boardgameguide.splendor.utils.GameUtils;
import com.brettspiel.boardgameguide.splendor.vo.config.SplendorGameConfig;
import com.brettspiel.utils.IdGenerator;
import com.brettspiel.utils.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.IntStream;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 11:31 AM
 */
@Slf4j
@Service
public class GameServiceImpl implements IGameService {

    @Autowired
    private ISplendorTableRepository splendorTableRepository;

    @Autowired
    private ISplendorGameRepository splendorGameRepository;

    @Autowired
    private IGameMapper gameMapper;

    @Autowired
    private SocketAssist socketAssist;

    @Autowired
    private GameUtils gameUtils;




    @Override
    public R<?> initGame(String userId, StartGameRequest body) {
        // Get from db
        SplendorTable splendorTable = splendorTableRepository.getByIdAndHost(body.getTableId(), userId);
        if (!Objects.equals(splendorTable.getHostId(), userId)) {
            log.error("initGame - You is not host - {} {} | {}", body.getTableId(), userId, splendorTable.getHostId());
            return R.failed("You is not host");
        }
        if (splendorTable.getUserIds().size() < 2) {
            log.error("initGame - Error system - {} | {}", body.getTableId(), splendorTable.getUserIds());
            return R.failed("Game have to 2 player or more to play");
        }

        //Shuffle player (Clone list)
        List<String> playerIds = new ArrayList<>(splendorTable.getUserIds());
        Collections.shuffle(playerIds);

        // Get card data from config
        int numberPlayer = splendorTable.getUserIds().size();
        SplendorGameConfig splendorGameConfig = gameUtils.getGameConfig(numberPlayer);
        if (splendorGameConfig == null) {
            log.error("initGame - Config splendor not found - {} | {}", numberPlayer, gameUtils.getListGameConfig());
            return R.failed(StrUtil.format("Can't init game with {} player", numberPlayer));
        }
        List<Card> cardsIngame =  splendorGameConfig.getCards().stream()
                .map(card -> Card.builder()
                        .id(card.getId())
                        .type(card.getType())
                        .level(card.getLevel())
                        .score(card.getScore())
                        .build())
                .toList();
        List<Noble> noblesIngame = splendorGameConfig.getNobles().stream()
                .map(noble -> Noble.builder()
                        .id(noble.getId())
                        .score(noble.getScore())
                        .build())
                .toList();

        // Init data ingame
        int openCard = 4;
        IngameData ingameData = IngameData.builder()
                .numberPlayer(splendorTable.getUserIds().size())
                .playerIds(playerIds)
                .endgameScore(splendorGameConfig.getEndgameScore())
                .currentPlayer(playerIds.get(0))
                .nextPlayer(playerIds.get(1))
                .deckNoble(noblesIngame)
                .fieldNoble(IntStream.range(0, splendorGameConfig.getNoble())
                        .mapToObj(index -> FieldNoble.builder()
                                .position(index)
                                .build())
                        .toList())
                .deckCard1(cardsIngame.stream()
                        .filter(card -> card.getLevel() == 1)
                        .toList())
                .fieldCard1(IntStream.range(0, openCard)
                        .mapToObj(index -> FieldCard.builder()
                                .position(index)
                                .build())
                        .toList())
                .deckCard2(cardsIngame.stream()
                        .filter(card -> card.getLevel() == 2)
                        .toList())
                .fieldCard2(IntStream.range(0, openCard)
                        .mapToObj(index -> FieldCard.builder()
                                .position(index)
                                .build())
                        .toList())
                .deckCard3(cardsIngame.stream()
                        .filter(card -> card.getLevel() == 3)
                        .toList())
                .fieldCard3(IntStream.range(0, openCard)
                        .mapToObj(index -> FieldCard.builder()
                                .position(index)
                                .build())
                        .toList())
                .gold(splendorGameConfig.getGold())
                .onyx(splendorGameConfig.getOnyx())
                .ruby(splendorGameConfig.getRuby())
                .emerald(splendorGameConfig.getEmerald())
                .sapphire(splendorGameConfig.getSapphire())
                .diamond(splendorGameConfig.getDiamond())
                .players(playerIds.stream()
                        .map(playerId -> IngamePlayerData.builder()
                                .playerId(playerId)
                                .build())
                        .toList())
                .build();

        // Update status
        splendorTable = splendorTableRepository.initGame(body.getTableId());
        if (splendorTable == null) {
            return R.failed("Table are playing");
        }

        // Save game to db
        SplendorGame splendorGame = SplendorGame.builder()
                .gameId(IdGenerator.nextObjectId())
                .tableId(splendorTable.getTableId())
                .playerIds(splendorTable.getUserIds())
                .status(GameConstants.STATUS_INIT)
                .cards(cardsIngame)
                .nobles(noblesIngame)
                .ingameData(ingameData)
                .build();
        splendorGame = splendorGameRepository.insert(splendorGame);

        // Notify to all user in table
        SplendorTable finalSplendorTable = splendorTable;
        SplendorGame finalSplendorGame = splendorGame;
        socketAssist.sendMessageToUsers(splendorTable.getUserIds(), new HashMap<>() {
            {
                put("event", GameConstants.EVENT_INIT_GAME);
                put("game_id", finalSplendorGame.getGameId());
                put("table_id", finalSplendorTable.getTableId());
                put("player_ids", finalSplendorGame.getPlayerIds());

            }
        });

        return R.ok(gameMapper.toSplendorGameDTO(splendorGame));
    }

    @Override
    public R<SplendorGameDTO> getGameInfo(String userId, String gameId) {
        SplendorGame splendorGame = splendorGameRepository.findById(gameId);
        if (splendorGame == null) {
            return R.failed("Game info not found");
        }

        return R.ok(gameMapper.toSplendorGameDTO(splendorGame));
    }

    @Override
    public R<?> startGame(String userId, String gameId) {
        // Get from db
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("startGame - User not in game - {} {}", userId, gameId);
            return R.failed("User not in game");
        }
        if (splendorGame.getStatus() != GameConstants.STATUS_INIT) {
            return R.failed("Game have started");
        }

        // Shuffle and open deck
        // Noble
        int sizeFieldNoble = splendorGame.getIngameData().getFieldNoble().size();
        List<Noble> deckNoble = splendorGame.getIngameData().getDeckNoble();
        Collections.shuffle(deckNoble);
        List<Noble> fieldNoble = deckNoble.stream().limit(sizeFieldNoble).toList();
        deckNoble = deckNoble.stream().skip(sizeFieldNoble).toList();
        // Card 1
        int sizeFieldCard1 = splendorGame.getIngameData().getFieldCard1().size();
        List<Card> deckCard1 = splendorGame.getIngameData().getDeckCard1();
        Collections.shuffle(deckCard1);
        List<Card> fieldCard1 = deckCard1.stream().limit(sizeFieldCard1).toList();
        deckCard1 = deckCard1.stream().skip(sizeFieldCard1).toList();
        // Card 2
        int sizeFieldCard2 = splendorGame.getIngameData().getFieldCard2().size();
        List<Card> deckCard2 = splendorGame.getIngameData().getDeckCard2();
        Collections.shuffle(deckCard2);
        List<Card> fieldCard2 = deckCard2.stream().limit(sizeFieldCard2).toList();
        deckCard2 = deckCard2.stream().skip(sizeFieldCard2).toList();
        // Card 3
        int sizeFieldCard3 = splendorGame.getIngameData().getFieldCard3().size();
        List<Card> deckCard3 = splendorGame.getIngameData().getDeckCard3();
        Collections.shuffle(deckCard3);
        List<Card> fieldCard3 = deckCard3.stream().limit(sizeFieldCard3).toList();
        deckCard3 = deckCard3.stream().skip(sizeFieldCard3).toList();

        // Save to db
        splendorGame = splendorGameRepository.startGame(gameId, deckNoble, fieldNoble, deckCard1, deckCard2, deckCard3, fieldCard1, fieldCard2, fieldCard3);
        if (splendorGame == null) {
            return R.failed("Game have started");
        }

        // Notify to all user in game
        SplendorGame finalSplendorGame = splendorGame;
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), new HashMap<>() {
            {
                put("event", GameConstants.EVENT_START_GAME);
                put("game_id", finalSplendorGame.getGameId());
                put("table_id", finalSplendorGame.getTableId());
                put("player_ids", finalSplendorGame.getPlayerIds());
                put("round", finalSplendorGame.getIngameData().getRound());
                put("turn", finalSplendorGame.getIngameData().getTurn());
                put("current_player", finalSplendorGame.getIngameData().getCurrentPlayer());
                put("next_player", finalSplendorGame.getIngameData().getNextPlayer());
                put("field_noble", finalSplendorGame.getIngameData().getFieldNoble());
                put("field_card_1", finalSplendorGame.getIngameData().getFieldCard1());
                put("field_card_2", finalSplendorGame.getIngameData().getFieldCard2());
                put("field_card_3", finalSplendorGame.getIngameData().getFieldCard3());
            }
        });

        return R.ok();
    }

    @Override
    public R<?> endTurn(String userId, String gameId) {
        // Update turn in db
        SplendorGame splendorGame = splendorGameRepository.endTurn(gameId, userId);
        if (splendorGame == null) {
            log.error("endTurn - Current turn isn't you - {} {}", gameId, userId);
            return R.failed("Current turn isn't you");
        }

        // Notify all user in game
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), new HashMap<>() {
            {
                put("event", GameConstants.EVENT_END_TURN);
                put("game_id", splendorGame.getGameId());
                put("table_id", splendorGame.getTableId());
                put("player_id", userId);
                put("round", splendorGame.getIngameData().getRound());
                put("turn", splendorGame.getIngameData().getTurn());
                put("current_player", splendorGame.getIngameData().getCurrentPlayer());
                put("next_player", splendorGame.getIngameData().getNextPlayer());
            }
        });

        return R.ok();
    }

    @Override
    public R<?> turnActionSkip(String userId, String gameId) {
        // Update turn in db
        SplendorGame splendorGame = splendorGameRepository.endTurn(gameId, userId);
        if (splendorGame == null) {
            log.error("turnActionSkip - Current turn isn't you - {} {}", gameId, userId);
            return R.failed("Current turn isn't you");
        }

        // Notify all user in game
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), new HashMap<>() {
            {
                put("event", GameConstants.EVENT_TURN_ACTION_SKIP);
                put("game_id", splendorGame.getGameId());
                put("table_id", splendorGame.getTableId());
                put("player_id", userId);
                put("round", splendorGame.getIngameData().getRound());
                put("turn", splendorGame.getIngameData().getTurn());
                put("current_player", splendorGame.getIngameData().getCurrentPlayer());
                put("next_player", splendorGame.getIngameData().getNextPlayer());
            }
        });

        return R.ok();
    }

    @Override
    public R<?> turnActionGatherGem(String userId, String gameId, TurnActionGatherGemRequest body) {
        // Validate
        if ((body.getOnyx() == null || body.getOnyx() == 0) &&
                (body.getRuby() == null || body.getRuby() == 0) &&
                (body.getEmerald() == null || body.getEmerald() == 0) &&
                (body.getSapphire() == null || body.getSapphire() == 0) &&
                (body.getDiamond() == null || body.getDiamond() == 0)) {
            return R.failed("Invalid request");
        }

        // Get from db
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("turnActionGatherGem - User not in game - {} {}", userId, gameId);
            return R.failed("User not in game");
        }
        if (!Objects.equals(splendorGame.getIngameData().getCurrentPlayer(), userId)) {
            return R.failed("Current turn isn't you");
        }

        // Validate game rule
        int onyx = body.getOnyx() == null ? 0 : body.getOnyx();
        int ruby = body.getRuby() == null ? 0 : body.getRuby();
        int emerald = body.getEmerald() == null ? 0 : body.getEmerald();
        int sapphire = body.getSapphire() == null ? 0 : body.getSapphire();
        int diamond = body.getDiamond() == null ? 0 : body.getDiamond();
        if ((onyx + ruby + emerald + sapphire + diamond > 3) ||
                onyx > 2 ||
                ruby > 2 ||
                emerald > 2 ||
                sapphire > 2 ||
                diamond > 2) {
            return R.failed("Gather gem break rule game");
        }
        if ((splendorGame.getIngameData().getOnyx() < 4 && onyx == 2 && ruby > 0 && emerald > 0 && sapphire > 0 && diamond > 0) ||
                (splendorGame.getIngameData().getRuby() < 4 && onyx > 0 && ruby == 2 && emerald > 0 && sapphire > 0 && diamond > 0) ||
                (splendorGame.getIngameData().getEmerald() < 4 && onyx > 0 && ruby > 0 && emerald == 2 && sapphire > 0 && diamond > 0) ||
                (splendorGame.getIngameData().getSapphire() < 4 && onyx > 0 && ruby > 0 && emerald > 0 && sapphire == 2 && diamond > 0) ||
                (splendorGame.getIngameData().getDiamond() < 4 && onyx > 0 && ruby > 0 && emerald > 0 && sapphire > 0 && diamond == 2)) {
            return R.failed("Gather gem break rule game");
        }

        // Update db
        splendorGame = splendorGameRepository.gatherGem(gameId, userId, onyx, ruby, emerald, sapphire, diamond);
        if (splendorGame == null) {
            log.error("turnActionGatherGem - Invalid request - {} {} {} {} {} {} {}", gameId, userId, onyx, ruby, emerald, sapphire, diamond);
            return R.failed("Invalid request");
        }

        // Notify all user in game
        SplendorGame finalSplendorGame = splendorGame;
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), new HashMap<>() {
            {
                put("event", GameConstants.EVENT_TURN_ACTION_GATHER_GEM);
                put("game_id", finalSplendorGame.getGameId());
                put("table_id", finalSplendorGame.getTableId());
                put("player_id", userId);
                put("round", finalSplendorGame.getIngameData().getRound());
                put("turn", finalSplendorGame.getIngameData().getTurn());
            }
        });

        return R.ok();
    }

    @Override
    public R<?> turnActionBuyCard(String userId, String gameId, TurnActionBuyCardRequest body) {
        // Get from db
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("turnActionBuyCard - User not in game - {} {}", gameId, userId);
            return R.failed("User not in game");
        }

        int gold = body.getGold() == null ? 0 : body.getGold();
        int onyx = body.getOnyx() == null ? 0 : body.getOnyx();
        int ruby = body.getRuby() == null ? 0 : body.getRuby();
        int emerald = body.getEmerald() == null ? 0 : body.getEmerald();
        int sapphire = body.getSapphire() == null ? 0 : body.getSapphire();
        int diamond = body.getDiamond() == null ? 0 : body.getDiamond();

        // Player data ingame
        IngamePlayerData playerData = splendorGame.getIngameData().getPlayers().stream()
                .filter(ingamePlayerData -> Objects.equals(ingamePlayerData.getPlayerId(), userId))
                .findFirst()
                .orElse(null);
        if (playerData == null) {
            log.error("turnActionBuyCard - System error - {} {}", gameId, userId);
            return R.failed("System error");
        }

        // Get config in game
        Card cardData = splendorGame.getCards().stream()
                .filter(card -> Objects.equals(card.getId(), body.getCardId()))
                .findFirst()
                .orElse(null);
        if (cardData == null) {
            log.error("turnActionBuyCard - Invalid card - {} {} {}", gameId, userId, body.getCardId());
            return R.failed("Invalid card");
        }
        CardCost cardCost = cardData.getCost();
        if (playerData.getGold() < gold ||
                playerData.getOnyx() < onyx ||
                playerData.getRuby() < ruby ||
                playerData.getEmerald() < emerald ||
                playerData.getSapphire() < sapphire ||
                playerData.getDiamond() < diamond ||
                cardCost.getOnyx() + onyx +
                cardCost.getRuby() + ruby +
                cardCost.getEmerald() + emerald +
                cardCost.getSapphire() + sapphire +
                cardCost.getDiamond() + diamond > -gold) {
            log.error("turnActionBuyCard - Resource not enough to buy card - {} {} {} {} {}", gameId, userId, playerData, cardCost, body);
            return R.failed("Resource not enough to buy card");
        }

        // Check card can buy
        boolean findCardBuy = false;
        if (!playerData.getReserveCards().isEmpty() && playerData.getReserveCards().stream()
                .anyMatch(card -> Objects.equals(card.getId(), body.getCardId()))) {
            findCardBuy = true;
            splendorGame = splendorGameRepository.buyCardInHand(gameId, userId, body.getCardId(), gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy reserve card error - {} {} {}", gameId, userId, body);
                return R.failed("Buy reserve card error");
            }
        }
        if (!findCardBuy && splendorGame.getIngameData().getFieldCard1().stream()
                .anyMatch(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), body.getCardId()))) {
            findCardBuy = true;
            splendorGame = splendorGameRepository.buyCardFieldLevel1(gameId, userId, body.getCardId(), gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy field card level 1 error - {} {} {}", gameId, userId, body);
                return R.failed("Buy field card level 1 error");
            }
        }
        if (!findCardBuy && splendorGame.getIngameData().getFieldCard2().stream()
                .anyMatch(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), body.getCardId()))) {
            findCardBuy = true;
            splendorGame = splendorGameRepository.buyCardFieldLevel2(gameId, userId, body.getCardId(), gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy field card level 2 error - {} {} {}", gameId, userId, body);
                return R.failed("Buy field card level 2 error");
            }
        }
        if (!findCardBuy && splendorGame.getIngameData().getFieldCard3().stream()
                .anyMatch(fieldCard -> fieldCard.getCard() != null && Objects.equals(fieldCard.getCard().getId(), body.getCardId()))) {
            findCardBuy = true;
            splendorGame = splendorGameRepository.buyCardFieldLevel3(gameId, userId, body.getCardId(), gold, onyx, ruby, emerald, sapphire, diamond);
            if (splendorGame == null) {
                log.error("turnActionBuyCard - Buy field card level 3 error - {} {} {}", gameId, userId, body);
                return R.failed("Buy field card level 3 error");
            }
        }

        if (!findCardBuy) {
            return R.failed("Card buy invalid");
        }

        return R.ok();
    }

}
