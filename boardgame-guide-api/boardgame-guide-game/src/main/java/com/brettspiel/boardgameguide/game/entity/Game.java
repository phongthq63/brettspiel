package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 7:04 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document("game")
public class Game extends BaseMongodbEntity {

    @Field("game_id")
    private String gameId;

    @Field("image_url")
    private String imageUrl;

    @Field("image_box_url")
    private String imageBoxUrl;

    private String name;

    private String title;

    private String description;

    @Field("min_play_time")
    private Integer minPlayTime;

    @Field("max_play_time")
    private Integer maxPlayTime;

    @Field("min_players")
    private Integer minPlayers;

    @Field("max_players")
    private Integer maxPlayers;

    private List<Genre> genres;

    private Integer popular;

    private Integer hot;

    @Field("top_rated")
    private Integer topRated;

}
