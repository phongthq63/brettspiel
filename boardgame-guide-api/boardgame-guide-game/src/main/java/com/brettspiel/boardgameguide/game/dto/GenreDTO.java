package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 4:42 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GenreDTO extends BaseDTO {

    @Schema(description = "Mã định danh duy nhất của thể loại", example = "genre001")
    private String id;

    @Schema(description = "Tên của thể loại", example = "Chiến thuật")
    private String name;

}

