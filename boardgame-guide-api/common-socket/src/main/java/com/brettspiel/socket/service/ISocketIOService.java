package com.brettspiel.socket.service;

import com.corundumstudio.socketio.SocketIOClient;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 7/3/2023 - 10:32 AM
 */
public interface ISocketIOService {

    void start();

    void stop();

    boolean isCluster();

    void joinRoom(String userId, String roomId);

    void leaveRoom(String userId, String roomId);

    void sendMessageToUser(SocketIOClient client, String event, Object responseModel);

    void broadcastMessageToUser(String uid, String event, Object responseModel);

    void broadcastMessageToUsers(List<String> uids, String event, Object responseModel);

    void broadcastMessageToRoom(String roomId, String event, Object responseModel);

    void broadcastMessageToAllUser(String event, Object responseModel);

}
