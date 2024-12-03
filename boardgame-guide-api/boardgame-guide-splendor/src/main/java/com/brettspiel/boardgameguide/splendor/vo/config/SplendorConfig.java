package com.brettspiel.boardgameguide.splendor.vo.config;

import lombok.Data;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 1:28 PM
 */
@Data
public class SplendorConfig {

    private String id;

    private String name;

    private List<Integer> numberPlayer;

    private Integer endgameScore;

    private List<CardConfig> card;

    private List<NobleConfig> noble;

    private List<SplendorGameConfig> config;

}
