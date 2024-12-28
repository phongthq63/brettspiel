package com.brettspiel.socket.helper;

import com.corundumstudio.socketio.HandshakeData;
import com.corundumstudio.socketio.SocketIOClient;
import org.springframework.http.HttpHeaders;

/**
 * Created by Quach Thanh Phong
 * On 7/4/2023 - 1:11 PM
 */
public class ClientHelper {

    private final static String HEADER_CLIENT_ID = "AUTH-ID";



    public static void setClientId(HandshakeData handshakeData, String clientId) {
        handshakeData.getHttpHeaders().set(HEADER_CLIENT_ID, clientId);
    }

    public static String getClientId(SocketIOClient client) {
        if (client == null) {
            return "";
        }

        String token = client.getHandshakeData().getHttpHeaders().get(HEADER_CLIENT_ID);
        if (token != null) {
            return token;
        }
        return client.getSessionId().toString();
    }

    public static String getClientLanguage(SocketIOClient client) {
        return client.getHandshakeData().getHttpHeaders().get(HttpHeaders.ACCEPT_LANGUAGE);
    }

}
