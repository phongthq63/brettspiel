package com.brettspiel.boardgameguide.splendor.entity.vo;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 11/27/2024 - 3:58 PM
 */
@Data
@Builder
public class NobleCost {

    @Field("card_onyx")
    private int card0nyx;

    @Field("card_ruby")
    private int cardRuby;

    @Field("card_emerald")
    private int cardEmerald;

    @Field("card_sapphire")
    private int cardSapphire;

    @Field("card_diamond")
    private int cardDiamond;

}
