package com.brettspiel.socket.service.impl;

import com.brettspiel.socket.helper.ClientHelper;
import com.brettspiel.socket.service.ISocketIORoomService;
import com.corundumstudio.socketio.SocketIOClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Created by Quach Thanh Phong
 * On 12/25/2024 - 2:14 AM
 */
@Slf4j
@Service
public class SocketIORoomServiceImpl implements ISocketIORoomService {

    @Override
    public void joinRoom(SocketIOClient client, String roomId) {
        client.joinRoom(roomId);
        log.info("SocketIO - Join room - {} {} {}", ClientHelper.getClientId(client), client.getSessionId(), roomId);
    }

    @Override
    public void leaveRoom(SocketIOClient client, String roomId) {
        client.leaveRoom(roomId);
        log.info("SocketIO - Leave room - {} {} {}", ClientHelper.getClientId(client), client.getSessionId(), roomId);
    }
}
