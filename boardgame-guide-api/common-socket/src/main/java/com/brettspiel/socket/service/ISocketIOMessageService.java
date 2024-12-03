package com.brettspiel.socket.service;

import com.corundumstudio.socketio.SocketIOClient;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 7/3/2023 - 1:31 PM
 */
public interface ISocketIOMessageService {

    void sendMessageToUser(SocketIOClient client, String eventId, Object socketModel);

    void sendMessageToUser(String id, String eventId, Object socketModel);

    void sendMessageToUsers(List<String> ids, String eventId, Object socketModel);

    void sendMessageToRoom(String namespace, String roomId, String eventId, Object socketModel);

    void sendMessageToAllUsers(String namespace, String eventId, Object socketModel);

}
