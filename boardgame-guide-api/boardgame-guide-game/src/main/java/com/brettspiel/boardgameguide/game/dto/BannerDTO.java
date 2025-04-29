package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 5:18 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class BannerDTO extends BaseDTO {

    private String id;

    private String gameId;

    private String gameImageUrl;

    private String gameImageBoxUrl;

    private String gameTitle;

    private String gameDescription;

    private String gameTutorialUrl;

    private String gamePlayUrl;

}
