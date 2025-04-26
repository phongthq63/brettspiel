package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

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

    private String title;

    private String description;

    @Field("image_url")
    private String imageUrl;

    @Field("min_play_time")
    private String minPlayTime;

    @Field("max_play_time")
    private String maxPlayTime;

    @Field("min_players")
    private String minPlayers;

    @Field("max_players")
    private String maxPlayers;

    private Integer popular;

    private Integer hot;

    @Field("top_rated")
    private Integer topRated;

}
