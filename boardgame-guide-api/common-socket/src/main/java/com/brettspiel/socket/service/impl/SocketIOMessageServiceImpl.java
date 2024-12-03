package com.brettspiel.socket.service.impl;

import com.brettspiel.socket.helper.ClientHelper;
import com.brettspiel.socket.service.ISocketIOClientService;
import com.brettspiel.socket.service.ISocketIOMessageService;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Quach Thanh Phong
 * On 7/3/2023 - 1:32 PM
 */
@Slf4j
@Service
@ConditionalOnBean(SocketIOServer.class)
public class SocketIOMessageServiceImpl implements ISocketIOMessageService {

    private final SocketIOServer socketIOServer;

    private final ISocketIOClientService socketIOClientService;


    public SocketIOMessageServiceImpl(SocketIOServer socketIOServer,
                                      ISocketIOClientService socketIOClientService) {
        this.socketIOServer = socketIOServer;
        this.socketIOClientService = socketIOClientService;
    }

    @Override
    public void sendMessageToUser(SocketIOClient client, String eventId, Object socketModel) {
        client.sendEvent(eventId, socketModel);
        log.info("SocketIO[{}] - SendMessageToUser: {} - {} - {}", ClientHelper.getClientId(client), client.getSessionId(), eventId, socketModel);
    }

    @Override
    public void sendMessageToUser(String id, String eventId, Object socketModel) {
        List<SocketIOClient> socketIOClients = socketIOClientService.getListClientById(id);
        socketIOClients.parallelStream()
                .forEach(socketIOClient -> sendMessageToUser(socketIOClient, eventId, socketModel));
        log.info("SocketIO[{}] - SendMessageToUser: {} - {} - {}", id, socketIOClientService.getListClientById(id).parallelStream().map(SocketIOClient::getSessionId).collect(Collectors.toSet()), eventId, socketModel);
    }

    @Override
    public void sendMessageToUsers(List<String> ids, String eventId, Object socketModel) {
        ids.parallelStream().forEach(uid -> {
            socketIOClientService.getListClientById(uid).parallelStream()
                    .forEach(socketIOClient -> sendMessageToUser(socketIOClient, eventId, socketModel));
        });
        log.info("SocketIO - BroadcastMessageToUsers: {} - {} - {}", ids, eventId, socketModel);
    }

    @Override
    public void sendMessageToRoom(String namespace, String roomId, String eventId, Object socketModel) {
        socketIOServer.getNamespace(namespace).getRoomOperations(roomId).sendEvent(eventId, socketModel);
        log.info("SocketIO - BroadcastMessageToRoom: {} - {} - {}", roomId, eventId, socketModel);
    }

    @Override
    public void sendMessageToAllUsers(String namespace, String eventId, Object socketModel) {
        socketIOServer.getNamespace(namespace).getBroadcastOperations().sendEvent(eventId, socketModel);
        log.info("SocketIO - BroadcastToAllUsers: {} - {}", eventId, socketModel);
    }

}
