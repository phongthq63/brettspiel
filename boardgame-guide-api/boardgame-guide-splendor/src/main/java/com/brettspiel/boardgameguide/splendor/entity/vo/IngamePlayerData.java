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
 * On 11/23/2024 - 12:57 AM
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngamePlayerData {

    @Field("player_id")
    private String playerId;

    @Builder.Default
    private int score = 0;

    @Builder.Default
    private List<Noble> nobles = new ArrayList<>();

    @Builder.Default
    private List<Card> cards = new ArrayList<>();

    @Builder.Default
    @Field("reserve_cards")
    private List<Card> reserveCards = new ArrayList<>();

    @Builder.Default
    private int gold = 0;

    @Builder.Default
    @Field("card_onyx")
    private int cardOnyx = 0;

    @Builder.Default
    private int onyx = 0;

    @Builder.Default
    @Field("card_ruby")
    private int cardRuby = 0;

    @Builder.Default
    private int ruby = 0;

    @Builder.Default
    @Field("card_emerald")
    private int cardEmerald = 0;

    @Builder.Default
    private int emerald = 0;

    @Builder.Default
    @Field("card_sapphire")
    private int cardSapphire = 0;

    @Builder.Default
    private int sapphire = 0;

    @Builder.Default
    @Field("card_diamond")
    private int cardDiamond = 0;

    @Builder.Default
    private int diamond = 0;

}
