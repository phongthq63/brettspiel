package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 4/30/2025 - 4:39 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document("game_video")
public class GameVideo extends BaseMongodbEntity {

    @Field("video_id")
    private String videoId;

    @Field("game_id")
    private String gameId;

    private String title;

    private String platform;

    @Field("thumbnail_url")
    private String thumbnailUrl;

    private String url;

}
