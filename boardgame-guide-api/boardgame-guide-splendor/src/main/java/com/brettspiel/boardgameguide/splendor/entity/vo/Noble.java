package com.brettspiel.boardgameguide.splendor.entity.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 11/18/2024 - 1:56 PM
 */
@Data
@Builder(toBuilder = true)
public class Noble {

    @Field("id")
    private String id;

    private Integer score;

    private NobleCost cost;

    @Field("image_front_url")
    private String imageFrontUrl;

    @Field("image_back_url")
    private String imageBackUrl;

}
