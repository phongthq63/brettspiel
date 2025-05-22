package com.brettspiel.boardgameguide.game.entity.vo;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 5/15/2025 - 3:42 PM
 */
@Data
@Builder
public class RoomPlayer {

    private String id;

    private String name;

    @Field("is_bot")
    private boolean isBot;

    @Field("is_player")
    private boolean isPlayer;

    private String local;

}
