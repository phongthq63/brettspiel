package com.brettspiel.boardgameguide.socket.exception;

import com.brettspiel.socket.helper.ClientHelper;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ExceptionListener;
import io.netty.channel.ChannelHandlerContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Quách Thanh Phong
 * On 7/3/2023 - 12:36 AM
 */
@Slf4j
@Component
@ConditionalOnBean(SocketIOServer.class)
public class SocketExceptionListener implements ExceptionListener {

    @Override
    public void onEventException(Exception e, List<Object> list, SocketIOClient socketIOClient) {
        log.error("SocketIO[{}] - Exception: event exception, {} {}", ClientHelper.getClientId(socketIOClient), socketIOClient, list, e);
    }

    @Override
    public void onDisconnectException(Exception e, SocketIOClient socketIOClient) {
        log.error("SocketIO[{}] - Exception: disconnect exception, {}", ClientHelper.getClientId(socketIOClient), socketIOClient, e);
    }

    @Override
    public void onConnectException(Exception e, SocketIOClient socketIOClient) {
        log.error("SocketIO[{}] - Exception: connect exception, {}", ClientHelper.getClientId(socketIOClient), socketIOClient, e);
    }

    @Override
    public void onPingException(Exception e, SocketIOClient socketIOClient) {
        log.error("SocketIO[{}] - Exception: ping exception, {}", ClientHelper.getClientId(socketIOClient), socketIOClient, e);
    }

    @Override
    public void onPongException(Exception e, SocketIOClient socketIOClient) {
        log.error("SocketIO[{}] - Exception: pong exception, {}", ClientHelper.getClientId(socketIOClient), socketIOClient, e);
    }

    @Override
    public boolean exceptionCaught(ChannelHandlerContext channelHandlerContext, Throwable throwable) {
        log.error("SocketIO - Exception: connection exception, {}", channelHandlerContext.channel(), throwable);
        return false;
    }

    @Override
    public void onAuthException(Throwable throwable, SocketIOClient socketIOClient) {
        log.error("SocketIO[{}] - Exception: auth exception, {}", ClientHelper.getClientId(socketIOClient), socketIOClient, throwable);
    }
}
