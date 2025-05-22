package com.brettspiel.boardgameguide.game.client;

import org.springframework.cloud.openfeign.FeignClient;

/**
 * Created by Quach Thanh Phong
 * On 5/19/2025 - 10:37 AM
 */
@FeignClient(value = "splendor-client", url = "${service.client.game-splendor-service.url}")
public interface SplendorClient {



}
