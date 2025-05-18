package com.brettspiel.boardgameguide.game.service.impl;

import com.brettspiel.boardgameguide.game.controller.dto.request.StartPlayRequest;
import com.brettspiel.boardgameguide.game.entity.Game;
import com.brettspiel.boardgameguide.game.entity.GameRoom;
import com.brettspiel.boardgameguide.game.entity.User;
import com.brettspiel.boardgameguide.game.repository.IGameRepository;
import com.brettspiel.boardgameguide.game.repository.IGameRoomRepository;
import com.brettspiel.boardgameguide.game.repository.IUserRepository;
import com.brettspiel.boardgameguide.game.service.IGameService;
import com.brettspiel.boardgameguide.game.service.IPlayService;
import com.brettspiel.utils.IdGenerator;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 5/14/2025 - 4:56 PM
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PlayServiceImpl implements IPlayService {

    private final IGameRepository gameRepository;

    private final IGameRoomRepository gameRoomRepository;

    private final IUserRepository userRepository;


    @Override
    public R<?> startPlay(String userId, StartPlayRequest request) {
        Game game = gameRepository.findById(request.getGameId());
        if (game == null) {
            return R.failed("Game not found");
        }
        if (game.getMinPlayers() > request.getPlayers().size() || game.getMaxPlayers() < request.getPlayers().size()) {
            return R.failed("Invalid number player");
        }

        // Check host
        List<String> userIds = request.getPlayers().stream()
                .filter(playerInfo -> !playerInfo.isBot() && playerInfo.getLocalPlayer() == null)
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

//        GameRoom gameRoom = GameRoom.builder()
//                .roomId(IdGenerator.nextObjectId())
//                .players()
//                .build();
//        gameRoomRepository.insert()

        return R.ok();
    }

}
