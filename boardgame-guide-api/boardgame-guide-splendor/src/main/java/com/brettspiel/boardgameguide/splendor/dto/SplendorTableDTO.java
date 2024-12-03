package com.brettspiel.boardgameguide.splendor.dto;

import com.brettspiel.service.dto.BaseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/15/2024 - 11:20 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SplendorTableDTO extends BaseDTO {

    @Schema(description = "Id bàn", example = "6739e14204ef47479a814e5b")
    private String tableId;

    @Schema(description = "Số lượng người chơi", example = "4")
    private Integer numberPlayer;

    @Schema(description = "Danh sách id người chơi", example = "[\"6739e185aa6d4921172c3ca2\"]")
    private List<String> userIds;

    @Schema(description = "Trạng thái (0: chờ; 1: đang tìm người chơi; 2: trong game)", example = "0")
    private Integer status;

    @Schema(description = "Id chủ phòng", example = "6739e14204ef47479a814e5b")
    private String hostId;

}
