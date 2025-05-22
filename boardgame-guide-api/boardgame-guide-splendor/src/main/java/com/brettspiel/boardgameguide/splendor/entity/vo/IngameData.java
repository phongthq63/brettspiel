package com.brettspiel.boardgameguide.splendor.entity.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/19/2024 - 4:16 PM
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngameData {

    @Builder.Default
    @Field("player_ids")
    private List<String> playerIds = new ArrayList<>();

    @Builder.Default
    private int round = 0;

    @Builder.Default
    private int turn = 0;

    @Field("turn_status")
    private int turnStatus;

    @Field("current_player")
    private String currentPlayer;

    @Field("next_player")
    private String nextPlayer;

    @Builder.Default
    @Field("deck_noble")
    private List<Noble> deckNoble = new ArrayList<>();

    @Builder.Default
    @Field("field_noble")
    private List<FieldNoble> fieldNoble = new ArrayList<>();

    @Builder.Default
    @Field("deck_card_1")
    private List<Card> deckCard1 = new ArrayList<>();

    @Builder.Default
    @Field("field_card_1")
    private List<FieldCard> fieldCard1 = new ArrayList<>();

    @Builder.Default
    @Field("deck_card_2")
    private List<Card> deckCard2 = new ArrayList<>();

    @Builder.Default
    @Field("field_card_2")
    private List<FieldCard> fieldCard2 = new ArrayList<>();

    @Builder.Default
    @Field("deck_card_3")
    private List<Card> deckCard3 = new ArrayList<>();

    @Builder.Default
    @Field("field_card_3")
    private List<FieldCard> fieldCard3 = new ArrayList<>();

    private int gold;

    private int onyx;

    private int ruby;

    private int emerald;

    private int sapphire;

    private int diamond;

    @Builder.Default
    private List<IngamePlayerData> players = new ArrayList<>();

}
