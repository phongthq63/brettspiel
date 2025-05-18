package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 5/12/2025 - 9:50 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GameExpansion extends BaseMongodbEntity {

    @Field("expansion_id")
    private String expansionId;

    @Field("game_id")
    private String gameId;

    private String name;

    private String title;

    @Field("image_url")
    private String imageUrl;

    @Field("image_box_url")
    private String imageBoxUrl;

    private String description;

    @Field("min_players")
    private Integer minPlayers;

    @Field("max_players")
    private Integer maxPlayers;

    @Field("game_rule")
    private List<GameRule> rules;

    /**
     * * Thông tin chuẩn bị cho mở rộng trò chơi
     * {
     *     "setting": {}
     *     ...
     * }
     */
    private Map<String, Object> setup;

}
