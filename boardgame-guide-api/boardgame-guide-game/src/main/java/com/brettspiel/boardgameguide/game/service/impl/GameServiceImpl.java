package com.brettspiel.boardgameguide.game.service.impl;

import com.brettspiel.boardgameguide.game.controller.dto.response.GetFilterGameResponse;
import com.brettspiel.boardgameguide.game.dto.FeaturedGameDTO;
import com.brettspiel.boardgameguide.game.dto.GameDTO;
import com.brettspiel.boardgameguide.game.entity.*;
import com.brettspiel.boardgameguide.game.mapper.GameMapper;
import com.brettspiel.boardgameguide.game.mapper.GamePlayTimeMapper;
import com.brettspiel.boardgameguide.game.mapper.GamePlayersMapper;
import com.brettspiel.boardgameguide.game.mapper.GenreMapper;
import com.brettspiel.boardgameguide.game.repository.*;
import com.brettspiel.boardgameguide.game.service.IGameService;
import com.brettspiel.service.dto.PageDTO;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 10:15 AM
 */
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements IGameService {

    private final IGameRepository gameRepository;

    private final IFeaturedGameRepository featuredGameRepository;

    private final IGamePlayersRepository gamePlayersRepository;

    private final IGamePlayTimeRepository gamePlayTimeRepository;

    private final IGenreRepository genreRepository;

    private final GameMapper gameMapper;

    private final GamePlayersMapper gamePlayersMapper;

    private final GamePlayTimeMapper gamePlayTimeMapper;

    private final GenreMapper genreMapper;


    @Override
    public R<GetFilterGameResponse> getFilterGame() {
        List<GamePlayers> gamePlayers = gamePlayersRepository.findAll();
        List<GamePlayTime> gamePlayTimes = gamePlayTimeRepository.findAll();
        List<Genre> genres = genreRepository.findAll();
        GetFilterGameResponse getFilterGameResponse = GetFilterGameResponse.builder()
                .players(gamePlayers.stream()
                        .map(gamePlayersMapper::toGamePlayersDTO)
                        .toList())
                .playTimes(gamePlayTimes.stream()
                        .map(gamePlayTimeMapper::toGamePlayTimeDTO)
                        .toList())
                .genres(genres.stream()
                        .map(genreMapper::toGenreDTO)
                        .toList())
                .build();

        return R.ok(getFilterGameResponse);
    }

    @Override
    public R<List<FeaturedGameDTO>> getListFeatureGame(String sortBy, Integer size) {
        List<FeaturedGame> featuredGames = sortBy == null ?
                featuredGameRepository.findList(size) :
                featuredGameRepository.findList(sortBy, size);
        List<FeaturedGameDTO> featuredGameDTOS = featuredGames.stream()
                .map(gameMapper::toFeaturedGameDTO)
                .toList();
        return R.ok(featuredGameDTOS);
    }

    @Override
    public R<PageDTO<GameDTO>> getListGame(Set<String> playersIds, Set<String> playTimeIds, Set<String> genreIds, String sortBy, Integer page, Integer size) {
        List<Integer[]> players = new ArrayList<>();
        if (playersIds != null && !playersIds.isEmpty()) {
            List<GamePlayers> gamePlayers = gamePlayersRepository.findList(playersIds);
            if (gamePlayers.isEmpty()) {
                return R.failed("Invalid playersIds");
            }
        }
        List<Integer[]> playTimes = new ArrayList<>();
        if (playTimeIds != null && !playTimeIds.isEmpty()) {
            List<GamePlayTime> gamePlayTimes = gamePlayTimeRepository.findList(playTimeIds);
            if (gamePlayTimes.isEmpty()) {
                return R.failed("Invalid playTimeIds");
            }
        }

        //
        List<Game> games = gameRepository.findList(players, playTimes, genreIds, sortBy, page, size);
        long total = gameRepository.count(players, playTimes, genreIds);
        List<GameDTO> gameDTOS = games.stream()
                .map(gameMapper::toGameDTO)
                .toList();
        PageDTO<GameDTO> pageDTO = PageDTO.<GameDTO>builder()
                .list(gameDTOS)
                .total(total)
                .page(page)
                .size(size)
                .build();
        return R.ok(pageDTO);
    }
}
