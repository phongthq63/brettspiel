package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:36 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document("game_players")
public class GamePlayers extends BaseMongodbEntity {

    @Field("players_id")
    private String playersId;

    private String display;

    @Field("min_players")
    private Integer minPlayers;

    @Field("max_players")
    private Integer maxPlayers;

}
