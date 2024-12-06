package com.brettspiel.boardgameguide.splendor.vo;

import com.brettspiel.service.vo.BaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 11/24/2024 - 1:02 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class FieldCardVO extends BaseVO {

    @Schema(description = "Vị trí", example = "1")
    private Integer position;

    @Schema(description = "Thông tin bài")
    private CardVO card;

}
