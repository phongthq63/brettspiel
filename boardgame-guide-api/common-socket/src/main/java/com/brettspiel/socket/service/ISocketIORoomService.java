package com.brettspiel.socket.service;

import com.corundumstudio.socketio.SocketIOClient;

/**
 * Created by Quach Thanh Phong
 * On 12/25/2024 - 2:14 AM
 */
public interface ISocketIORoomService {

    void joinRoom(SocketIOClient client, String roomId);

    void leaveRoom(SocketIOClient client, String roomId);

}
