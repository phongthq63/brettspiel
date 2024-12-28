package com.brettspiel.boardgameguide.socket.handler.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

/**
 * Created by Quach Thanh Phong
 * On 7/25/2022 - 10:59 AM
 */
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public abstract class BaseSocketResponse {
}
