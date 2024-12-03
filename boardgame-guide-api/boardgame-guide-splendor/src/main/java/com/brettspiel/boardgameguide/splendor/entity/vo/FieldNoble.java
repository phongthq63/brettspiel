package com.brettspiel.boardgameguide.splendor.entity.vo;

import lombok.Builder;
import lombok.Data;

/**
 * Created by Quach Thanh Phong
 * On 11/24/2024 - 11:56 AM
 */
@Data
@Builder
public class FieldNoble {

    private Integer position;

    private Noble noble;

}
