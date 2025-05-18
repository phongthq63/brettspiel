package com.brettspiel.boardgameguide.game.entity.vo;

import lombok.Builder;
import lombok.Data;

/**
 * Created by Quach Thanh Phong
 * On 5/15/2025 - 3:42 PM
 */
@Data
@Builder
public class RoomPlayer {

    private String id;

    private String name;

    private String local;

    private String bot;

}
