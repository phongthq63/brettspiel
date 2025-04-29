package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 4/28/2025 - 1:40 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document("game_play_time")
public class GamePlayTime extends BaseMongodbEntity {

    @Field("play_time_id")
    private String playTimeId;

    private String display;

    @Field("min_play_time")
    private Integer minPlayTime;

    @Field("max_play_time")
    private Integer maxPlayTime;

}
