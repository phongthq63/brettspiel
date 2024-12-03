package com.brettspiel.boardgameguide.splendor.controller.dto.request;

import com.brettspiel.boardgameguide.splendor.constant.GameConstants;
import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 11/24/2024 - 6:04 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ActionInTurnRequest extends BaseRequest {

    @NotNull
    @Schema(description = "Loại action (0: Bỏ lượt; 1: Nhặt ngọc; 2: mua bài; 3: cọc bài)",
            requiredMode = Schema.RequiredMode.REQUIRED,
            allowableValues = {
                    GameConstants.ACTION_TYPE_SKIP + "",
                    GameConstants.ACTION_TYPE_GATHER_GEM + "",
                    GameConstants.ACTION_TYPE_BUY_CARD + "",
                    GameConstants.ACTION_TYPE_RESERVE_CARD + ""
            },
            example = "0")
    private Integer actionType;

    @Schema(description = "Id thẻ bài mua", example = "diamond_3")
    private String card;

    @Schema(description = "Id thẻ bài dự trữ", example = "diamond_3")
    private String reserveCard;

    @Schema(description = "Số lượng vàng tương tác (+ lấy, - trả)", example = "1")
    private Integer gold;

    @Schema(description = "Số lượng mã não tương tác (+ lấy, - trả)", example = "1")
    private Integer onyx;

    @Schema(description = "Số lượng hồng ngọc tương tác (+ lấy, - trả)", example = "1")
    private Integer ruby;

    @Schema(description = "Số lượng ngọc lục bảo tương tác (+ lấy, - trả)", example = "1")
    private Integer emerald;

    @Schema(description = "Số lượng đá saphia tương tác (+ lấy, - trả)", example = "1")
    private Integer sapphire;

    @Schema(description = "Số lượng kim cương tương tác (+ lấy, - trả)", example = "1")
    private Integer diamond;

    @Schema(description = "Id quý tộc lấy", example = "noble_4w4b")
    private String noble;

}
