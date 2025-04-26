package com.brettspiel.boardgameguide.game.service.impl;

import com.brettspiel.boardgameguide.game.constants.GameConstants;
import com.brettspiel.boardgameguide.game.dto.FeaturedGameDTO;
import com.brettspiel.boardgameguide.game.entity.FeaturedGame;
import com.brettspiel.boardgameguide.game.mapper.IGameMapper;
import com.brettspiel.boardgameguide.game.repository.IFeaturedGameRepository;
import com.brettspiel.boardgameguide.game.service.IGameService;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 10:15 AM
 */
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements IGameService {

    private final IFeaturedGameRepository featuredGameRepository;

    private final IGameMapper gameMapper;



    @Override
    public R<List<FeaturedGameDTO>> getListFeatureGame(GameConstants.SortBy sortBy, Integer size) {
        List<FeaturedGame> featuredGames = sortBy == null ?
                featuredGameRepository.findList(size) :
                featuredGameRepository.findList(sortBy.getId(), size);
        List<FeaturedGameDTO> featuredGameDTOS = featuredGames.stream()
                .map(gameMapper::toFeaturedGameDTO)
                .toList();
        return R.ok(featuredGameDTOS);
    }
}
