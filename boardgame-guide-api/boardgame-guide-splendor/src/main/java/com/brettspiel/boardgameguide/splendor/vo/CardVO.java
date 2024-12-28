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
public class CardVO extends BaseVO {

    @Schema(description = "Id bài", example = "6739e14204ef47479a814e5b")
    private String id;

    @Schema(description = "Loại", example = "diamond")
    private String type;

    @Schema(description = "Cấp", example = "1")
    private Integer level;

    @Schema(description = "Giá")
    private CardCostVO cost;

}
