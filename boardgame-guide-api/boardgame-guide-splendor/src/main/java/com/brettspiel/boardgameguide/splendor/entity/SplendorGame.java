package com.brettspiel.boardgameguide.splendor.entity;

import com.brettspiel.boardgameguide.splendor.entity.vo.Card;
import com.brettspiel.boardgameguide.splendor.entity.vo.IngameData;
import com.brettspiel.boardgameguide.splendor.entity.vo.Noble;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/13/2024 - 4:13 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document("splendor_game")
public class SplendorGame extends BaseMongodbEntity {

    @Field("game_id")
    private String gameId;

    @Field("table_id")
    private String tableId;

    @Field("player_ids")
    private List<String> playerIds;

    private Integer status;

    @Builder.Default
    private List<Noble> nobles = new ArrayList<>();

    @Builder.Default
    private List<Card> cards = new ArrayList<>();

    @Field("ingame_data")
    private IngameData ingameData;

}
