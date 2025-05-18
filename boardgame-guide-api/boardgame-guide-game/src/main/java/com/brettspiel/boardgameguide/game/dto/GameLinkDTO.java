package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 5/11/2025 - 2:53 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GameLinkDTO extends BaseDTO {

    @Schema(
            description = "Unique identifier for the game link",
            example = "link-001"
    )
    private String id;

    @Schema(
            description = "Identifier of the game to which this link belongs",
            example = "game-001"
    )
    private String gameId;

    @Schema(
            description = "Name of the game link",
            example = "Official Website"
    )
    private String name;

    @Schema(
            description = "URL to the icon representing the link",
            example = "https://example.com/images/link-icon.png"
    )
    private String iconUrl;

    @Schema(
            description = "URL to the external resource or website",
            example = "https://example.com/official-website"
    )
    private String url;

}
