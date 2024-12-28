package com.brettspiel.socket.service;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 7/7/2022 - 11:48 AM
 */
public interface ISocketIOPubSubService {

    void initPubSubStoreListener();

    void removePubSubStoreListener();

    void publishSystemJoinRoom(String namespace, String clientId, String roomId);

    void publishSystemLeaveRoom(String namespace, String clientId, String roomId);

    void publishUserMessage(String namespace, String event, String id, Object data);

    void publishUsersMessage(String namespace, String event, List<String> ids, Object data);

    void publishRoomMessage(String namespace, String event, String roomId, Object data);

    void publishAllUserMessage(String namespace, String event, Object data);

}
