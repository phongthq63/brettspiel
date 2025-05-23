package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/25/2025 - 10:58 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document("featured_game")
public class FeaturedGame extends BaseMongodbEntity {

    @Field("game_id")
    private String gameId;

    @Field("image_url")
    private String imageUrl;

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
