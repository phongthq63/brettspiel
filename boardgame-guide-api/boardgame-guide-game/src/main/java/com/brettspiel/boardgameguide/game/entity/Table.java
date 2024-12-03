package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/17/2024 - 4:19 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document("table")
public class Table extends BaseMongodbEntity {

    @Field("game_id")
    private String gameId;

    private String gameMode;

    @Field("number_player")
    private Integer numberPlayer;

    @Field("user_ids")
    private List<String> userIds;

    private Integer status;

    private String hostId;

}
