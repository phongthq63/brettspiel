package com.brettspiel.socket.service;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 7/7/2022 - 11:48 AM
 */
public interface ISocketIOPubSubService {

    void initPubSubStoreListener();

    void removePubSubStoreListener();

    void publishUserPacket(String namespace, String event, String id, Object publishData);

    void publishUsersPacket(String namespace, String event, List<String> ids, Object publishData);

    void publishRoomPacket(String namespace, String event, String roomId, Object publishData);

    void publishAllUserPacket(String namespace, String event, Object publishData);

}
