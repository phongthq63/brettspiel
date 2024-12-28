package com.brettspiel.boardgameguide.socket.service;

import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 12/24/2024 - 2:03 PM
 */
public interface ISplendorService {

    void handlerGameInit(String tableId, Map<String, Object> data);

    void handlerGameStart(String gameId, Map<String, Object> data);

}
