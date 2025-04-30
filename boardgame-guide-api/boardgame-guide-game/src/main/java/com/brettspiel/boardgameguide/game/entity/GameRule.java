package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by Quach Thanh Phong
 * On 4/30/2025 - 3:31 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document("game_rule")
public class GameRule extends BaseMongodbEntity {

    private String ruleId;

    private String gameId;

    private String name;

    private String language;

    private String imageIconUrl;

    private String documentUrl;

}
