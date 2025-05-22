package com.brettspiel.boardgameguide.splendor.entity;

import com.brettspiel.boardgameguide.splendor.entity.vo.Card;
import com.brettspiel.boardgameguide.splendor.entity.vo.Noble;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/21/2024 - 2:46 PM
 */
@Data
public class SplendorGameConfig {

    @Field("endgame_score")
    private Integer endgameScore;

    @Field("number_player")
    private Integer numberPlayer;

    private List<Card> cards;

    private List<Noble> nobles;

    private Integer noble;

    private Integer gold;

    private Integer onyx;

    private Integer ruby;

    private Integer emerald;

    private Integer sapphire;

    private Integer diamond;

}
