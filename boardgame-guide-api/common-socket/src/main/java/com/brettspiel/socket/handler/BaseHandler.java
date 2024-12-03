package com.brettspiel.socket.handler;

import com.brettspiel.socket.helper.ClientHelper;
import com.brettspiel.socket.service.ISocketIOMessageService;
import com.brettspiel.socket.service.ISocketIOPubSubService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;

/**
 * Created by Quach Thanh Phong
 * On 7/4/2023 - 11:17 AM
 */
@Component
@ConditionalOnBean(SocketIOServer.class)
public abstract class BaseHandler<T> implements ConnectListener, DisconnectListener, DataListener<T> {

    protected final ISocketIOMessageService socketIOMessageService;

    protected final ISocketIOPubSubService socketIOPubSubService;



    public BaseHandler(ISocketIOMessageService socketIOMessageService,
                       ISocketIOPubSubService socketIOPubSubService) {
        this.socketIOMessageService = socketIOMessageService;
        this.socketIOPubSubService = socketIOPubSubService;
    }

    protected final String getUidByClient(SocketIOClient socketIOClient) {
        return ClientHelper.getClientId(socketIOClient);
    }

    protected final Locale getLocaleByClient(SocketIOClient socketIOClient) {
        String lang = ClientHelper.getClientLanguage(socketIOClient);
        return lang == null || lang.isEmpty() ? Locale.US : Locale.forLanguageTag(lang);
    }

    protected final void sendMessageToUser(SocketIOClient client, String event, T responseModel) {
        socketIOMessageService.sendMessageToUser(client, event, responseModel);
    }

    protected final void broadcastMessageToUser(String uid, String event, T responseModel) {
        socketIOMessageService.sendMessageToUser(uid, event, responseModel);
        socketIOPubSubService.publishUserPacket("", event, uid, responseModel);
    }

    protected final void broadcastMessageToUsers(List<String> uids, String event, T responseModel) {
        socketIOMessageService.sendMessageToUsers(uids, event, responseModel);
        socketIOPubSubService.publishUsersPacket("", event, uids, responseModel);
    }

    protected final void broadcastMessageToRoom(String roomId, String event, T responseModel) {
        socketIOMessageService.sendMessageToRoom("", roomId, event, responseModel);
        socketIOPubSubService.publishRoomPacket("", event, roomId, responseModel);
    }

    protected final void broadcastMessageToAllUser(String event, T responseModel) {
        socketIOMessageService.sendMessageToAllUsers("", event, responseModel);
        socketIOPubSubService.publishAllUserPacket("", event, responseModel);
    }

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
