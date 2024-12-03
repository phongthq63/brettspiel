package com.brettspiel.boardgameguide.splendor.vo.config;

import lombok.Data;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/21/2024 - 2:46 PM
 */
@Data
public class SplendorGameConfig {

    private Integer endgameScore;

    private Integer numberPlayer;

    private List<CardConfig> cards;

    private List<NobleConfig> nobles;

    private Integer noble;

    private Integer gold;

    private Integer onyx;

    private Integer ruby;

    private Integer emerald;

    private Integer sapphire;

    private Integer diamond;

}
