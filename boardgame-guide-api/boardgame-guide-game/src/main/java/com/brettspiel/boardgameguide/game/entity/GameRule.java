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
public class GameRule extends BaseMongodbEntity {

    @Field("rule_id")
    private String ruleId;

    @Field("game_id")
    private String gameId;

    private String name;

    private String language;

    @Field("language_icon_url")
    private String languageIconUrl;

    @Field("document_url")
    private String documentUrl;

}
