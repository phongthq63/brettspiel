package com.brettspiel.socket.helper;

import com.corundumstudio.socketio.SocketIOClient;
import org.springframework.http.HttpHeaders;

/**
 * Created by Quach Thanh Phong
 * On 7/4/2023 - 1:11 PM
 */
public class ClientHelper {

    public static String getClientId(SocketIOClient client) {
        if (client == null) {
            return "";
        }
        return client.getSessionId().toString();
    }

    public static String getClientLanguage(SocketIOClient client) {
        return client.getHandshakeData().getHttpHeaders().get(HttpHeaders.ACCEPT_LANGUAGE);
    }

}
