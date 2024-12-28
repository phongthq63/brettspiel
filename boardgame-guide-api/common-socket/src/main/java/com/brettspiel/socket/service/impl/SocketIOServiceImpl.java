package com.brettspiel.socket.service.impl;

import com.brettspiel.socket.service.*;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.EventInterceptor;
import com.corundumstudio.socketio.transport.NamespaceClient;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 7/3/2023 - 10:32 AM
 */
@Slf4j
@Service
@Order(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnBean(SocketIOServer.class)
@RequiredArgsConstructor
public class SocketIOServiceImpl implements ISocketIOService, EventInterceptor {

    @Value("${socket-io.cluster:#{false}}")
    private boolean cluster;

    private final SocketIOServer socketIOServer;

    private final ISocketIOClientService socketIOClientService;

    private final ISocketIOMessageService socketIOMessageService;

    private final ISocketIORoomService socketIORoomService;

    private final ISocketIOPubSubService socketIOPubSubService;



    @PostConstruct
    public void autoStartup() {
        start();
    }

    @PreDestroy
    public void autoStop() {
        stop();
    }


    @Override
    public void start() {
        socketIOServer.addConnectListener(socketIOClientService);
        socketIOServer.addDisconnectListener(socketIOClientService);
        socketIOServer.addEventInterceptor(this);

        socketIOServer.start();
        if (cluster) {
            socketIOPubSubService.initPubSubStoreListener();
        }
    }

    @Override
    public void stop() {
        if (cluster) {
            socketIOPubSubService.removePubSubStoreListener();
        }
        if (socketIOServer != null) {
            socketIOServer.stop();
        }
    }

    @Override
    public boolean isCluster() {
        return cluster;
    }

    @Override
    public void joinRoom(String userId, String roomId) {
        List<SocketIOClient> socketIOClients = socketIOClientService.getListClientById(userId);
        socketIOClients.forEach(socketIOClient -> socketIORoomService.joinRoom(socketIOClient, roomId));
        socketIOPubSubService.publishSystemJoinRoom("", userId, roomId);
    }

    @Override
    public void leaveRoom(String userId, String roomId) {
        List<SocketIOClient> socketIOClients = socketIOClientService.getListClientById(userId);
        socketIOClients.forEach(socketIOClient -> socketIORoomService.leaveRoom(socketIOClient, roomId));
        socketIOPubSubService.publishSystemLeaveRoom("", userId, roomId);
    }

    @Override
    public void sendMessageToUser(SocketIOClient client, String event, Object responseModel) {
        socketIOMessageService.sendMessageToUser(client, event, responseModel);
    }

    @Override
    public void broadcastMessageToUser(String uid, String event, Object responseModel) {
        socketIOMessageService.sendMessageToUser(uid, event, responseModel);
        socketIOPubSubService.publishUserMessage("", event, uid, responseModel);
    }

    @Override
    public void broadcastMessageToUsers(List<String> uids, String event, Object responseModel) {
        socketIOMessageService.sendMessageToUsers(uids, event, responseModel);
        socketIOPubSubService.publishUsersMessage("", event, uids, responseModel);
    }

    @Override
    public void broadcastMessageToRoom(String roomId, String event, Object responseModel) {
        socketIOMessageService.sendMessageToRoom("", roomId, event, responseModel);
        socketIOPubSubService.publishRoomMessage("", event, roomId, responseModel);
    }

    @Override
    public void broadcastMessageToAllUser(String event, Object responseModel) {
        socketIOMessageService.sendMessageToAllUsers("", event, responseModel);
        socketIOPubSubService.publishAllUserMessage("", event, responseModel);
    }

    @Override
    public void onEvent(NamespaceClient namespaceClient, String s, List<Object> list, AckRequest ackRequest) {
        log.info("SocketIO - EventInterceptor: {} {} {} {}", namespaceClient.getSessionId(), s, list, ackRequest);
    }
}
