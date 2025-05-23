package com.brettspiel.boardgameguide.splendor.entity;

import com.brettspiel.boardgameguide.splendor.entity.vo.Card;
import com.brettspiel.boardgameguide.splendor.entity.vo.IngameData;
import com.brettspiel.boardgameguide.splendor.entity.vo.Noble;
import com.brettspiel.boardgameguide.splendor.entity.vo.PlayerInfo;
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

    @Field("room_id")
    private String roomId;

    private String type;

    private List<PlayerInfo> players;

    private Integer status;

    private SplendorGameConfig config;

    @Field("ingame_data")
    private IngameData ingameData;

}
