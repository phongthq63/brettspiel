package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 5:10 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document("banner")
public class Banner extends BaseMongodbEntity{

    @Field("banner_id")
    private String bannerId;

    @Field("game_id")
    private String gameId;

    @Field("game_image_url")
    private String gameImageUrl;

    @Field("game_image_box_url")
    private String gameImageBoxUrl;

    @Field("game_title")
    private String gameTitle;

    @Field("game_description")
    private String gameDescription;

    @Field("game_tutorial_url")
    private String gameTutorialUrl;

    @Field("game_play_url")
    private String gamePlayUrl;

}
