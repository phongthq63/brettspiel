package com.brettspiel.boardgameguide.splendor.vo;

import com.brettspiel.service.vo.BaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 11/27/2024 - 3:58 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CardCostVO extends BaseVO {

    @Schema(description = "Số lượng mã não", example = "1")
    private int onyx;

    @Schema(description = "Số lượng hồng ngọc", example = "2")
    private int ruby;

    @Schema(description = "Số lượng ngọc lục bảo", example = "3")
    private int emerald;

    @Schema(description = "Số lượng đá saphia", example = "4")
    private int sapphire;

    @Schema(description = "Số lượng kim cương", example = "5")
    private int diamond;

}
