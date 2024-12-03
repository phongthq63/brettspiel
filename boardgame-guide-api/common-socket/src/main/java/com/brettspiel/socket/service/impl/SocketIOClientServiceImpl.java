package com.brettspiel.socket.service.impl;

import com.brettspiel.socket.helper.ClientHelper;
import com.brettspiel.socket.service.ISocketIOClientService;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Quach Thanh Phong
 * On 7/5/2023 - 9:17 AM
 */
@Slf4j
@Service
@ConditionalOnBean(SocketIOServer.class)
public class SocketIOClientServiceImpl implements ISocketIOClientService {

    private static final Map<String, Map<UUID, SocketIOClient>> clientMap = new ConcurrentHashMap<>();


    @Override
    public List<SocketIOClient> getListClientById(String id) {
        return new ArrayList<>(clientMap.getOrDefault(id, new HashMap<>()).values());
    }

    @Override
    public void onConnect(SocketIOClient socketIOClient) {
        String id = ClientHelper.getClientId(socketIOClient);
        log.info("SocketIO[{}] - OnConnect - ID: {} - Session: {}", id, id, socketIOClient.getSessionId());

        if (id != null && !id.isEmpty()) {
            //Group client connect by id
            Map<UUID, SocketIOClient> socketIOClients = clientMap.get(id);
            if (Objects.isNull(socketIOClients)) {
                socketIOClients = new ConcurrentHashMap<>();
            }
            if (!socketIOClients.containsKey(socketIOClient.getSessionId())) {
                socketIOClients.put(socketIOClient.getSessionId(), socketIOClient);
            }
            clientMap.put(id, socketIOClients);
        }

        log.info("SocketIO[{}] - OnConnect - Connect Success - ID: {} - Session: {} - {}", id, id, socketIOClient.getSessionId(), clientMap.size());
    }

    @Override
    public void onDisconnect(SocketIOClient socketIOClient) {
        String id = ClientHelper.getClientId(socketIOClient);
        log.info("SocketIO[{}] - OnDisconnect - ID: {} - Session: {}", id, id, socketIOClient.getSessionId());

        if (id != null && !id.isEmpty()) {
            Map<UUID, SocketIOClient> socketIOClients = clientMap.get(id);
            if (socketIOClients != null) {
                //remove client connection
                socketIOClients.remove(socketIOClient.getSessionId());
                if (socketIOClients.isEmpty()) {
                    clientMap.remove(id);
                }
            }
            socketIOClient.disconnect();
        }
    }

}
