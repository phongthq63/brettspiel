package com.brettspiel.boardgameguide.splendor.entity.vo;

import lombok.Builder;
import lombok.Data;

/**
 * Created by Quach Thanh Phong
 * On 11/27/2024 - 3:58 PM
 */
@Data
@Builder
public class CardCost {

    private int onyx;

    private int ruby;

    private int emerald;

    private int sapphire;

    private int diamond;

}
