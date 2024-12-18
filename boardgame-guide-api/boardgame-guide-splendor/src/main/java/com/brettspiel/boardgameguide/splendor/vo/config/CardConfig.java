package com.brettspiel.boardgameguide.splendor.vo.config;

import lombok.Data;

/**
 * Created by Quach Thanh Phong
 * On 11/21/2024 - 1:47 PM
 */
@Data
public class CardConfig {

    private String id;

    private String type;

    private Integer level;

    private Integer score;

    private CardCostConfig cost;

    private String imageFrontUrl;

    private String imageBackUrl;

}
