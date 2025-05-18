package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 4/30/2025 - 3:31 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GameLink extends BaseMongodbEntity {

    @Field("link_id")
    private String linkId;

    @Field("game_id")
    private String gameId;

    private String name;

    @Field("icon_url")
    private String iconUrl;

    private String url;

}
