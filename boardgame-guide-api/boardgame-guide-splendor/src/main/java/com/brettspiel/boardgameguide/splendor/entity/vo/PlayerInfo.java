package com.brettspiel.boardgameguide.splendor.entity.vo;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 5/19/2025 - 9:48 PM
 */
@Data
@Builder
public class PlayerInfo {

    @Field("id")
    private String id;

    private String name;

    @Field("is_bot")
    private boolean isBot;

    @Field("is_player")
    private boolean isPlayer;

    private String local;

}
