package com.brettspiel.boardgameguide.splendor.usecase;

import com.brettspiel.boardgameguide.splendor.dto.PlayerDTO;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import com.brettspiel.utils.R;

import java.util.List;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 5/20/2025 - 1:09 PM
 */
public abstract class BaseSplendorUsecase<T> {

    public abstract T initGame(String roomId, List<PlayerDTO> players, Map<String, Object> setup);

    public abstract R<?> startGame(SplendorGame splendorGame);

}
