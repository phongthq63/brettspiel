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
        splendorGame = splendorGameRepository.startGame(gameId, ingameData);
        if (splendorGame == null) {
            log.warn("startGame - Game have started - {}", gameId);
            return R.ok("Game have started");
        }

        // Notify to all user in game
        SplendorGame finalSplendorGame = splendorGame;
        socketAssist.broadcastMessageToRoom(splendorGame.getGameId(), "", new HashMap<>() {
            {
                put("service_type", ServiceConstants.SERVICE_GAME_SPLENDOR);
                put("event_type", GameConstants.EVENT_START_GAME);
                put("game_id", finalSplendorGame.getGameId());
                put("room_id", finalSplendorGame.getRoomId());
                put("players", finalSplendorGame.getPlayers());
                put("status", finalSplendorGame.getStatus());
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

}
