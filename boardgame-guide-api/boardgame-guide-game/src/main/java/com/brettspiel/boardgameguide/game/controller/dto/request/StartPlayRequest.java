package com.brettspiel.boardgameguide.game.controller.dto.request;

import com.brettspiel.service.dto.request.BaseRequest;
import com.brettspiel.service.vo.BaseVO;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 5/14/2025 - 4:57 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class StartPlayRequest extends BaseRequest {

    @NotEmpty
    @Schema(description = "Id game", example = "game01")
    private String gameId;

    @NotEmpty
    @Schema(description = "List of players participating in the game")
    private List<PlayerInfo> players;

    @Schema(
            description = "Configuration setup for starting the game",
            example = "{\"difficulty\": \"hard\", \"timeLimit\": \"30\"}"
    )
    private Map<String, Object> setup;



    @EqualsAndHashCode(callSuper = true)
    @Data
    public static class PlayerInfo extends BaseVO {

        @NotEmpty
        @Schema(description = "Unique identifier for the player", example = "player1")
        private String id;

        @Schema(description = "Name of the player", example = "Alice")
        private String name;

        @Schema(description = "Indicates if this player is the local player", example = "player1")
        private String localPlayer;

        @Schema(description = "Indicates if this player is a bot", example = "false")
        private boolean isBot;
    }
}
