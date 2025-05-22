package com.brettspiel.boardgameguide.game.service.impl;

import cn.hutool.core.util.StrUtil;
import com.brettspiel.boardgameguide.game.controller.dto.request.StartPlayRequest;
import com.brettspiel.boardgameguide.game.entity.Game;
import com.brettspiel.boardgameguide.game.entity.GameRoom;
import com.brettspiel.boardgameguide.game.entity.User;
import com.brettspiel.boardgameguide.game.mapper.RoomMapper;
import com.brettspiel.boardgameguide.game.repository.IGameRepository;
import com.brettspiel.boardgameguide.game.repository.IGameRoomRepository;
import com.brettspiel.boardgameguide.game.repository.IUserRepository;
import com.brettspiel.boardgameguide.game.service.IPlayService;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Created by Quach Thanh Phong
 * On 5/14/2025 - 4:56 PM
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PlayServiceImpl implements IPlayService {

    @Value("${spring.kafka.producer.topic.start-play}")
    private String topicStartPlay;

    private final IGameRepository gameRepository;

    private final IGameRoomRepository gameRoomRepository;

    private final IUserRepository userRepository;

    private final RoomMapper roomMapper;

    private final KafkaTemplate<String, Object> kafkaTemplate;


    @Override
    public R<?> startPlay(String userId, StartPlayRequest request) {
        // Check room
        GameRoom gameRoom = gameRoomRepository.findById(request.getRoomId());
        if (gameRoom == null) {
            return R.failed("Game not found");
        }
        if (!Objects.equals(userId, gameRoom.getHostId())) {
            return R.failed("Invalid request");
        }

        // Get game info
        Game game = gameRepository.findById(gameRoom.getGameId());
        if (game.getMinPlayers() > request.getPlayers().size() || game.getMaxPlayers() < request.getPlayers().size()) {
            return R.failed("Invalid number player");
        }

        // Check host
        List<String> userIds = request.getPlayers().stream()
                .filter(playerInfo -> playerInfo.getLocal() == null)
                .map(StartPlayRequest.PlayerInfo::getId)
                .toList();
        if (!userIds.contains(userId)) {
            return R.failed("Invalid host");
        }

        // Check user in room
        List<User> users = userRepository.findByIds(userIds);
        if (userIds.size() != users.size()) {
            return R.failed("Invalid player");
        }

        // Publish game
        Map<String, Object> publishData = new HashMap<>();
        publishData.put("game_id", game.getGameId());
        publishData.put("room_id", gameRoom.getRoomId());
        publishData.put("players", request.getPlayers());
        publishData.put("setup", request.getSetup());
        kafkaTemplate.send(StrUtil.format(topicStartPlay, game.getGameId()), gameRoom.getRoomId(), publishData);

        return R.ok();
    }

}
