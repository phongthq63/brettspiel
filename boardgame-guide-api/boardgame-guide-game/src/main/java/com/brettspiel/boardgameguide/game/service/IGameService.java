package com.brettspiel.boardgameguide.game.service;

import com.brettspiel.boardgameguide.game.constants.GameConstants;
import com.brettspiel.boardgameguide.game.dto.FeaturedGameDTO;
import com.brettspiel.utils.R;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 10:15 AM
 */
public interface IGameService {

    R<List<FeaturedGameDTO>> getListFeatureGame(GameConstants.SortBy sortBy, Integer size);

}
