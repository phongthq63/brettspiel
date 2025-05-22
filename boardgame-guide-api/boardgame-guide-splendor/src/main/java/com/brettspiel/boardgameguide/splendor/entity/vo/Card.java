package com.brettspiel.boardgameguide.splendor.entity.vo;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 11/18/2024 - 1:56 PM
 */
@Data
@Builder(toBuilder = true)
public class Card {

    @Field("id")
    private String id;

    private String type;

    private Integer level;

    private Integer score;

    private CardCost cost;

    @Field("image_front_url")
    private String imageFrontUrl;

    @Field("image_back_url")
    private String imageBackUrl;

}
