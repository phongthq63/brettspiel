package com.brettspiel.socket.handler;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Component;

/**
 * Created by Quach Thanh Phong
 * On 7/4/2023 - 11:17 AM
 */
@Component
@ConditionalOnBean(SocketIOServer.class)
@RequiredArgsConstructor
public abstract class BaseHandler<T> implements ConnectListener, DisconnectListener, DataListener<T> {

    @Override
    public void onConnect(SocketIOClient socketIOClient) {

    }

    @Override
    public void onDisconnect(SocketIOClient socketIOClient) {

    }

    @Override
    public void onData(SocketIOClient socketIOClient, T t, AckRequest ackRequest) throws Exception {

    }

}
