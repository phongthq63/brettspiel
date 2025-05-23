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
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("startGame - Invalid request - {} {}", gameId, userId);
            return R.failed("Invalid request");
        }

        // Check game status
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
    public R<?> endTurn(String userId, String gameId, String playerId) {
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("endTurn - Invalid request - {} {}", gameId, userId);
            return R.failed("Invalid request");
        }

        // Check game status
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                log.error("endTurn - Game not start - {} {}", gameId, userId);
                return R.failed("Game not start");
            case GameConstants.STATUS_PLAY:
                break;
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }

        // Check valid
        if (playerId != null) {
            PlayerInfo playerInfo = splendorGame.getPlayers().stream()
                    .filter(player -> player.getId().equals(playerId))
                    .findAny()
                    .orElse(null);
            if (playerInfo == null ||
                    (playerInfo.getLocal() != null && !Objects.equals(playerInfo.getLocal(), userId))) {
                log.error("endTurn - Player not found - {} {}", gameId, userId);
                return R.failed("Player not found");
            }
        }
        String currentPlayer = playerId == null ? userId : playerId;

        return splendorStandardUsecase.endTurn(currentPlayer, splendorGame);
    }

    @Override
    public R<?> turnActionGatherGem(String userId, String gameId, TurnActionGatherGemRequest body) {
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("turnActionGatherGem - Invalid request - {} {}", gameId, userId);
            return R.failed("Invalid request");
        }

        // Check game status
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                log.error("turnActionGatherGem - Game not start - {} {}", gameId, userId);
                return R.failed("Game not start");
            case GameConstants.STATUS_PLAY:
                break;
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }

        // Check valid
        if (body.getPlayerId() != null) {
            PlayerInfo playerInfo = splendorGame.getPlayers().stream()
                    .filter(player -> player.getId().equals(body.getPlayerId()))
                    .findAny()
                    .orElse(null);
            if (playerInfo == null ||
                    (playerInfo.getLocal() != null && !Objects.equals(playerInfo.getLocal(), userId))) {
                log.error("endTurn - Player not found - {} {}", gameId, userId);
                return R.failed("Player not found");
            }
        }
        String currentPlayer = body.getPlayerId() == null ? userId : body.getPlayerId();

        return splendorStandardUsecase.turnActionGatherGem(
                currentPlayer,
                splendorGame,
                body.getGold() == null ? 0 : body.getGold(),
                body.getOnyx() == null ? 0 : body.getOnyx(),
                body.getRuby() == null ? 0 : body.getRuby(),
                body.getEmerald() == null ? 0 : body.getEmerald(),
                body.getSapphire() == null ? 0 : body.getSapphire(),
                body.getDiamond() == null ? 0 : body.getDiamond());
    }

    @Override
    public R<?> turnActionBuyCard(String userId, String gameId, TurnActionBuyCardRequest body) {
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("turnActionBuyCard - User not in game - {} {}", gameId, userId);
            return R.failed("User not in game");
        }

        // Check game status
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                log.error("turnActionBuyCard - Game not start - {} {}", gameId, userId);
                return R.failed("Game not start");
            case GameConstants.STATUS_PLAY:
                break;
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }

        // Check valid
        if (body.getPlayerId() != null) {
            PlayerInfo playerInfo = splendorGame.getPlayers().stream()
                    .filter(player -> player.getId().equals(body.getPlayerId()))
                    .findAny()
                    .orElse(null);
            if (playerInfo == null ||
                    (playerInfo.getLocal() != null && !Objects.equals(playerInfo.getLocal(), userId))) {
                log.error("endTurn - Player not found - {} {}", gameId, userId);
                return R.failed("Player not found");
            }
        }
        String currentPlayer = body.getPlayerId() == null ? userId : body.getPlayerId();

        return splendorStandardUsecase.turnActionBuyCard(
                currentPlayer,
                splendorGame,
                body.getCardId(),
                body.getGold() == null ? 0 : body.getGold(),
                body.getOnyx() == null ? 0 : body.getOnyx(),
                body.getRuby() == null ? 0 : body.getRuby(),
                body.getEmerald() == null ? 0 : body.getEmerald(),
                body.getSapphire() == null ? 0 : body.getSapphire(),
                body.getDiamond() == null ? 0 : body.getDiamond());
    }

    @Override
    public R<?> turnActionReserveCard(String userId, String gameId, TurnActionReserveCardRequest body) {
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("turnActionReserveCard - Invalid request - {} {}", gameId, userId);
            return R.failed("Invalid request");
        }

        // Check game status
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                log.error("turnActionReserveCard - Game not start - {} {}", gameId, userId);
                return R.failed("Game not start");
            case GameConstants.STATUS_PLAY:
                break;
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }

        // Check valid
        if (body.getPlayerId() != null) {
            PlayerInfo playerInfo = splendorGame.getPlayers().stream()
                    .filter(player -> player.getId().equals(body.getPlayerId()))
                    .findAny()
                    .orElse(null);
            if (playerInfo == null ||
                    (playerInfo.getLocal() != null && !Objects.equals(playerInfo.getLocal(), userId))) {
                log.error("endTurn - Player not found - {} {}", gameId, userId);
                return R.failed("Player not found");
            }
        }
        String currentPlayer = body.getPlayerId() == null ? userId : body.getPlayerId();

        return splendorStandardUsecase.turnActionReserveCard(
                userId,
                splendorGame,
                body.getDesk1(),
                body.getDesk2(),
                body.getDesk3(),
                body.getCardId(),
                body.getGold() == null ? 0 : body.getGold());
    }

    @Override
    public R<?> turnBonusActionTakeNoble(String userId, String gameId, TurnBonusActionTakeNobleRequest body) {
        SplendorGame splendorGame = splendorGameRepository.findGameUserIn(gameId, userId);
        if (splendorGame == null) {
            log.error("turnBonusActionTakeNoble - User not in game - {} {}", gameId, userId);
            return R.failed("User not in game");
        }

        // Check game status
        switch (splendorGame.getStatus()) {
            case GameConstants.STATUS_INIT:
                log.error("turnBonusActionTakeNoble - Game not start - {} {}", gameId, userId);
                return R.failed("Game not start");
            case GameConstants.STATUS_PLAY:
                break;
            case GameConstants.STATUS_END:
                return R.failed("Game have ended");
        }

        // Check valid
        if (body.getPlayerId() != null) {
            PlayerInfo playerInfo = splendorGame.getPlayers().stream()
                    .filter(player -> player.getId().equals(body.getPlayerId()))
                    .findAny()
                    .orElse(null);
            if (playerInfo == null ||
                    (playerInfo.getLocal() != null && !Objects.equals(playerInfo.getLocal(), userId))) {
                log.error("endTurn - Player not found - {} {}", gameId, userId);
                return R.failed("Player not found");
            }
        }
        String currentPlayer = body.getPlayerId() == null ? userId : body.getPlayerId();

        return splendorStandardUsecase.turnBonusActionTakeNoble(currentPlayer, splendorGame, body.getNobleId());
    }

}
