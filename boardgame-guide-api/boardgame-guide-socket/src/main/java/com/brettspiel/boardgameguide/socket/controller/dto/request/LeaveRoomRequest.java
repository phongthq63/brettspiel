package com.brettspiel.boardgameguide.socket.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 12/25/2024 - 10:22 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class LeaveRoomRequest extends BaseRequest {

    @NotBlank
    @Schema(description = "Id người chơi", requiredMode = Schema.RequiredMode.REQUIRED, example = "a3b1ada4s12bs10b6d1a30x")
    private String userId;

    @NotBlank
    @Schema(description = "Id phòng", requiredMode = Schema.RequiredMode.REQUIRED, example = "a3b1ada4s12bs10b6d1a30x")
    private String roomId;

}
