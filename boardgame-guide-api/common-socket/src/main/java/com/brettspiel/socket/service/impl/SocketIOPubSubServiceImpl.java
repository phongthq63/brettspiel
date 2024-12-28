package com.brettspiel.socket.service.impl;

import com.brettspiel.socket.helper.JsonHelper;
import com.brettspiel.socket.service.ISocketIOClientService;
import com.brettspiel.socket.service.ISocketIOMessageService;
import com.brettspiel.socket.service.ISocketIOPubSubService;
import com.brettspiel.socket.service.ISocketIORoomService;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.protocol.Packet;
import com.corundumstudio.socketio.protocol.PacketType;
import com.corundumstudio.socketio.store.pubsub.DispatchMessage;
import com.corundumstudio.socketio.store.pubsub.PubSubListener;
import com.corundumstudio.socketio.store.pubsub.PubSubStore;
import com.corundumstudio.socketio.store.pubsub.PubSubType;
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

    private final ISocketIOClientService socketIOClientService;

    private final ISocketIOMessageService socketIOMessageService;

    private final ISocketIORoomService socketIORoomService;


    public SocketIOPubSubServiceImpl(SocketIOServer socketIOServer,
                                     ISocketIOClientService socketIOClientService,
                                     ISocketIOMessageService socketIOMessageService,
                                     ISocketIORoomService socketIORoomService) {
        this.pubSubStore = socketIOServer.getConfiguration().getStoreFactory().pubSubStore();
        this.socketIOServer = socketIOServer;
        this.socketIOClientService = socketIOClientService;
        this.socketIOMessageService = socketIOMessageService;
        this.socketIORoomService = socketIORoomService;
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
    public void publishSystemJoinRoom(String namespace, String clientId, String roomId) {
        Packet packet = new Packet(PacketType.MESSAGE);
        packet.setSubType(PacketType.EVENT);
        packet.setData(new HashMap<>(){
            {
                put("t", "s-jr");
                put("c", clientId);
                put("r", roomId);
            }
        });
        pubSubStore.publish(PubSubType.DISPATCH, new DispatchMessage("", packet, namespace));
    }

    @Override
    public void publishSystemLeaveRoom(String namespace, String clientId, String roomId) {
        Packet packet = new Packet(PacketType.MESSAGE);
        packet.setSubType(PacketType.EVENT);
        packet.setData(new HashMap<>(){
            {
                put("t", "s-lr");
                put("c", clientId);
                put("r", roomId);
            }
        });
        pubSubStore.publish(PubSubType.DISPATCH, new DispatchMessage("", packet, namespace));
    }


    @Override
    public void publishUserMessage(String namespace, String event, String id, Object data) {
        Packet packet = new Packet(PacketType.MESSAGE);
        packet.setSubType(PacketType.EVENT);
        packet.setData(new HashMap<>(){
            {
                put("t", "u-m");
                put("e", event);
                put("i", id);
                put("d", data);
            }
        });
        pubSubStore.publish(PubSubType.DISPATCH, new DispatchMessage("", packet, namespace));
    }

    @Override
    public void publishUsersMessage(String namespace, String event, List<String> ids, Object data) {
        Packet packet = new Packet(PacketType.MESSAGE);
        packet.setSubType(PacketType.EVENT);
        packet.setData(new HashMap<>(){
            {
                put("t", "u-m");
                put("e", event);
                put("i", ids);
                put("d", data);
            }
        });
        pubSubStore.publish(PubSubType.DISPATCH, new DispatchMessage("", packet, namespace));
    }

    @Override
    public void publishRoomMessage(String namespace, String event, String roomId, Object data) {
        Packet packet = new Packet(PacketType.MESSAGE);
        packet.setSubType(PacketType.EVENT);
        packet.setData(new HashMap<>(){
            {
                put("t", "u-m");
                put("e", event);
                put("d", data);
            }
        });
        pubSubStore.publish(PubSubType.DISPATCH, new DispatchMessage(roomId, packet, namespace));
    }

    @Override
    public void publishAllUserMessage(String namespace, String event, Object data) {
        Packet packet = new Packet(PacketType.MESSAGE);
        packet.setSubType(PacketType.EVENT);
        packet.setData(new HashMap<>(){
            {
                put("t", "u-m");
                put("e", event);
                put("d", data);
            }
        });
        pubSubStore.publish(PubSubType.DISPATCH, new DispatchMessage("", packet, namespace));
    }

    @Override
    public void onMessage(DispatchMessage dispatchMessage) {
        Packet packet = dispatchMessage.getPacket();
        Map packetData;
        if (packet.getData() instanceof String) {
            packetData = JsonHelper.toObject(packet.getData(), Map.class);
        } else {
            packetData = JsonHelper.convertObject(packet.getData(), Map.class);
        }
        if (packetData == null) {
            return;
        }
        log.info("PubSubStoreListener - ParseSuccess - {}", packetData);

        //Send message
        String namespace = dispatchMessage.getNamespace();
        String room = dispatchMessage.getRoom();
        String type = packetData.get("t").toString();
        String event = packetData.get("e").toString();

        switch (type) {
            case "s-jr":
            {
                Object clientId = packetData.get("c");
                Object roomId = packetData.get("r");
                List<SocketIOClient> socketIOClients = socketIOClientService.getListClientById(clientId.toString());
                socketIOClients.forEach(socketIOClient -> socketIORoomService.joinRoom(socketIOClient, roomId.toString()));
                break;
            }
            case "s-lr":
            {
                Object clientId = packetData.get("c");
                Object roomId = packetData.get("r");
                List<SocketIOClient> socketIOClients = socketIOClientService.getListClientById(clientId.toString());
                socketIOClients.forEach(socketIOClient -> socketIORoomService.leaveRoom(socketIOClient, roomId.toString()));
                break;
            }
            case "u-m":
            {
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
                    } else if (id instanceof List ids) {
                        socketIOMessageService.sendMessageToUsers(ids, event, data);
                    } else {
                        throw new RuntimeException("Can't parser client id. ");
                    }
                    log.info("PubSubStoreListener - User - {}", id);
                } else {
                    //Send event to all user
                    socketIOMessageService.sendMessageToAllUsers(namespace, event, data);
                    log.info("PubSubStoreListener - ALL");
                }
                break;
            }
        }
    }

}
