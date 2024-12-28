package com.brettspiel.boardgameguide.splendor.vo;

import com.brettspiel.service.vo.BaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 11/18/2024 - 1:56 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class NobleVO extends BaseVO {

    @Schema(description = "Id quý tộc", example = "6739e14204ef47479a814e5b")
    private String id;

    @Schema(description = "Giá")
    private NobleCostVO cost;

}
