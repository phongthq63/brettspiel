package com.brettspiel.socket.service;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DisconnectListener;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 7/5/2023 - 9:16 AM
 */
public interface ISocketIOClientService extends ConnectListener, DisconnectListener {

    List<SocketIOClient> getListClientById(String id);

}
