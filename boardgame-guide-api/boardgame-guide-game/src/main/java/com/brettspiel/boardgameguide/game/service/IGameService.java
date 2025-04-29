package com.brettspiel.boardgameguide.game.service;

import com.brettspiel.boardgameguide.game.controller.dto.response.GetFilterGameResponse;
import com.brettspiel.boardgameguide.game.dto.FeaturedGameDTO;
import com.brettspiel.boardgameguide.game.dto.GameDTO;
import com.brettspiel.service.dto.PageDTO;
import com.brettspiel.utils.R;

import java.util.List;
import java.util.Set;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 10:15 AM
 */
public interface IGameService {

    R<GetFilterGameResponse> getFilterGame();

    R<List<FeaturedGameDTO>> getListFeatureGame(String sortBy, Integer size);

    R<PageDTO<GameDTO>> getListGame(Set<String> playersIds, Set<String> playTimeIds, Set<String> genreIds, String sortBy, Integer page, Integer size);

}
