package com.brettspiel.boardgameguide.game.constants;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Created by Quach Thanh Phong
 * On 4/26/2025 - 10:30 AM
 */
public class GameConstants {

    @Getter
    @RequiredArgsConstructor
    public enum SortBy {
        NEWEST("popular"),
        PRICE("hot"),
        NAME("top_rated");

        private final String id;
    }

}
