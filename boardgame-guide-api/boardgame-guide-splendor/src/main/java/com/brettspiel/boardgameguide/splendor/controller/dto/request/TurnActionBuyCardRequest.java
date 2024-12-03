package com.brettspiel.boardgameguide.splendor.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NegativeOrZero;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 11/24/2024 - 11:33 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TurnActionBuyCardRequest extends BaseRequest {

    @NotBlank
    @Schema(description = "Id thẻ bài mua", example = "diamond_3")
    private String cardId;

    @NegativeOrZero
    @Schema(description = "Số lượng vàng tương tác (+ lấy, - trả)", example = "1")
    private Integer gold;

    @NegativeOrZero
    @Schema(description = "Số lượng mã não tương tác (+ lấy, - trả)", example = "1")
    private Integer onyx;

    @NegativeOrZero
    @Schema(description = "Số lượng hồng ngọc tương tác (+ lấy, - trả)", example = "1")
    private Integer ruby;

    @NegativeOrZero
    @Schema(description = "Số lượng ngọc lục bảo tương tác (+ lấy, - trả)", example = "1")
    private Integer emerald;

    @NegativeOrZero
    @Schema(description = "Số lượng đá saphia tương tác (+ lấy, - trả)", example = "1")
    private Integer sapphire;

    @NegativeOrZero
    @Schema(description = "Số lượng kim cương tương tác (+ lấy, - trả)", example = "1")
    private Integer diamond;

}
