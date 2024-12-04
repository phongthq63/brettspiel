package com.brettspiel.boardgameguide.splendor.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 12/3/2024 - 4:10 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TurnActionReserveCardRequest extends BaseRequest {

    @PositiveOrZero
    @Schema(description = "Số lượng lấy ẩn thẻ 1", example = "0")
    private Integer desk1;

    @PositiveOrZero
    @Schema(description = "Số lượng lấy ẩn thẻ 2", example = "0")
    private Integer desk2;

    @PositiveOrZero
    @Schema(description = "Số lượng lấy ẩn thẻ 3", example = "0")
    private Integer desk3;

    @Schema(description = "Id thẻ bài lấy", example = "diamond_3")
    private String cardId;

    @PositiveOrZero
    @Schema(description = "Số lượng vàng tương tác (+ lấy, - trả)", example = "1")
    private Integer gold;

}
