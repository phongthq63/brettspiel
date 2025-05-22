package com.brettspiel.boardgameguide.splendor.entity;

import com.brettspiel.boardgameguide.splendor.entity.vo.Card;
import com.brettspiel.boardgameguide.splendor.entity.vo.Noble;
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

    private List<Integer> numberOfPlayers;

    private Integer endgameScore;

    private List<Card> cards;

    private List<Noble> nobles;

    private List<SplendorGameConfig> configs;

}
