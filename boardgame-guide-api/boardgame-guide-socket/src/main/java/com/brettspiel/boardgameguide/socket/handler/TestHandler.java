package com.brettspiel.boardgameguide.socket.handler;

import com.brettspiel.socket.handler.BaseHandler;
import com.brettspiel.socket.model.SocketModel;
import com.brettspiel.socket.service.ISocketIOMessageService;
import com.brettspiel.socket.service.ISocketIOPubSubService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * Created by Quach Thanh Phong
 * On 7/3/2023 - 1:46 PM
 */
@Slf4j
@Component
public class TestHandler extends BaseHandler<SocketModel<?>> {

    public TestHandler(ISocketIOMessageService socketIOMessageService, ISocketIOPubSubService socketIOPubSubService) {
        super(socketIOMessageService, socketIOPubSubService);
    }

    @OnEvent("test")
    @Override
    public void onData(SocketIOClient socketIOClient, SocketModel<?> socketModel, AckRequest ackRequest) {
        log.info("TEST {}", socketModel);
    }

    @OnConnect
    @Override
    public void onConnect(SocketIOClient socketIOClient) {
        log.info("TEST connect");
    }

    @OnDisconnect
    @Override
    public void onDisconnect(SocketIOClient socketIOClient) {
        log.info("TEST disconnect");
    }

}
