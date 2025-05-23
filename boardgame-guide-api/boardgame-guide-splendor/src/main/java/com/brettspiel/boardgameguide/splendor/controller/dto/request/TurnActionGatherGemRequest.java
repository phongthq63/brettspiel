package com.brettspiel.boardgameguide.splendor.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NegativeOrZero;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 11/24/2024 - 11:33 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TurnActionGatherGemRequest extends BaseRequest {

    @Schema(description = "Id người chơi", example = "a3b1ada4s12bs10b6d1a30x")
    private String playerId;

    @NegativeOrZero
    @Schema(description = "Số lượng mã não tương tác (+ lấy, - trả)", example = "1")
    private Integer gold = 0;

    @Schema(description = "Số lượng mã não tương tác (+ lấy, - trả)", example = "1")
    private Integer onyx = 0;

    @Schema(description = "Số lượng hồng ngọc tương tác (+ lấy, - trả)", example = "1")
    private Integer ruby = 0;

    @Schema(description = "Số lượng ngọc lục bảo tương tác (+ lấy, - trả)", example = "1")
    private Integer emerald = 0;

    @Schema(description = "Số lượng đá saphia tương tác (+ lấy, - trả)", example = "1")
    private Integer sapphire = 0;

    @Schema(description = "Số lượng kim cương tương tác (+ lấy, - trả)", example = "1")
    private Integer diamond = 0;

}
