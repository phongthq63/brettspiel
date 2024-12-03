package com.brettspiel.socket.service.impl;

import com.brettspiel.socket.helper.JsonHelper;
import com.brettspiel.socket.service.ISocketIOMessageService;
import com.brettspiel.socket.service.ISocketIOPubSubService;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.protocol.Packet;
import com.corundumstudio.socketio.protocol.PacketType;
import com.corundumstudio.socketio.store.pubsub.DispatchMessage;
import com.corundumstudio.socketio.store.pubsub.PubSubListener;
import com.corundumstudio.socketio.store.pubsub.PubSubStore;
import com.corundumstudio.socketio.store.pubsub.PubSubType;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by Quach Thanh Phong
 * On 7/7/2022 - 11:49 AM
 */
@Slf4j
@Service
@ConditionalOnBean(SocketIOServer.class)
public class SocketIOPubSubServiceImpl implements ISocketIOPubSubService, PubSubListener<DispatchMessage> {

    private final PubSubStore pubSubStore;

    private final SocketIOServer socketIOServer;

    private final ISocketIOMessageService socketIOMessageService;


    public SocketIOPubSubServiceImpl(SocketIOServer socketIOServer,
                                     ISocketIOMessageService socketIOMessageService) {
        this.socketIOServer = socketIOServer;
        this.socketIOMessageService = socketIOMessageService;
        this.pubSubStore = socketIOServer.getConfiguration().getStoreFactory().pubSubStore();
    }

    @Override
    public void initPubSubStoreListener() {
        log.info("SocketIORoomService - initPubSubStoreListener");
        pubSubStore.unsubscribe(PubSubType.DISPATCH);
        pubSubStore.subscribe(PubSubType.DISPATCH, this, DispatchMessage.class);
    }

    @Override
    public void removePubSubStoreListener() {
        log.info("SocketIORoomService - removePubSubStoreListener");
        pubSubStore.shutdown();
    }


    @Override
    public void publishUserPacket(String namespace, String event, String id, Object publishData) {
        Packet packet = new Packet(PacketType.MESSAGE);
        packet.setSubType(PacketType.EVENT);
        packet.setData(new HashMap<>(){
            {
                put("e", event);
                put("i", id);
                put("d", publishData);
            }
        });
        pubSubStore.publish(PubSubType.DISPATCH, new DispatchMessage("", packet, namespace));
    }

    @Override
    public void publishUsersPacket(String namespace, String event, List<String> ids, Object publishData) {
        Packet packet = new Packet(PacketType.MESSAGE);
        packet.setSubType(PacketType.EVENT);
        packet.setData(new HashMap<>(){
            {
                put("e", event);
                put("i", ids);
                put("d", publishData);
            }
        });
        pubSubStore.publish(PubSubType.DISPATCH, new DispatchMessage("", packet, namespace));
    }

    @Override
    public void publishRoomPacket(String namespace, String event, String roomId, Object publishData) {
        Packet packet = new Packet(PacketType.MESSAGE);
        packet.setSubType(PacketType.EVENT);
        packet.setData(new HashMap<>(){
            {
                put("e", event);
                put("d", publishData);
            }
        });
        pubSubStore.publish(PubSubType.DISPATCH, new DispatchMessage(roomId, packet, namespace));
    }

    @Override
    public void publishAllUserPacket(String namespace, String event, Object publishData) {
        Packet packet = new Packet(PacketType.MESSAGE);
        packet.setSubType(PacketType.EVENT);
        packet.setData(new HashMap<>(){
            {
                put("e", event);
                put("d", publishData);
            }
        });
        pubSubStore.publish(PubSubType.DISPATCH, new DispatchMessage("", packet, namespace));
    }

    @Override
    public void onMessage(DispatchMessage dispatchMessage) {
        Packet packet = dispatchMessage.getPacket();
        Map<String, Object> packetData;
        try {
            if (packet.getData() instanceof String) {
                packetData = JsonHelper.toObject(packet.getData(), Map.class);
            } else {
                packetData = JsonHelper.convertObject(packet.getData(), Map.class);
            }
        } catch (JsonProcessingException e) {
            log.info("PubSubStoreListener - Error -" + e);
            return;
        }
        log.info("PubSubStoreListener - ParseSuccess - {}", packetData);

        //Send message
        String namespace = dispatchMessage.getNamespace();
        String room = dispatchMessage.getRoom();
        String event = packetData.get("e").toString();
        Object id = packetData.get("i");
        Object data = packetData.get("d");

        if (!room.isEmpty()) {
            //Send event to room
            socketIOMessageService.sendMessageToRoom(namespace, room, event, data);
            log.info("PubSubStoreListener - Room - {}: {}", room, socketIOServer.getRoomOperations(room).getClients().stream().map(SocketIOClient::getSessionId).collect(Collectors.toList()));
        } else if (id != null) {
            //Send event to user
            if (id instanceof String) {
                socketIOMessageService.sendMessageToUser(id.toString(), event, data);
            } else if (id instanceof List) {
                socketIOMessageService.sendMessageToUsers((List<String>) id, event, data);
            } else {
                throw new RuntimeException("Can't parser client id. ");
            }
            log.info("PubSubStoreListener - User - {}", id);
        } else {
            //Send event to all user
            socketIOMessageService.sendMessageToAllUsers(namespace, event, data);
            log.info("PubSubStoreListener - ALL");
        }

    }

}
