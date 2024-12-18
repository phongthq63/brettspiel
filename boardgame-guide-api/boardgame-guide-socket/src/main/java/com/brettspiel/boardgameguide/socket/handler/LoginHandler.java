package com.brettspiel.boardgameguide.socket.handler;

import com.corundumstudio.socketio.AuthorizationListener;
import com.corundumstudio.socketio.AuthorizationResult;
import com.corundumstudio.socketio.HandshakeData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by Quách Thanh Phong
 * On 7/3/2023 - 12:46 AM
 */
@Slf4j
@Component
public class LoginHandler implements AuthorizationListener {

    @Value("${socketio.authentication:#{false}}")
    private Boolean authentication;

    @Override
    public AuthorizationResult getAuthorizationResult(HandshakeData handshakeData) {
        log.info("LoginHandler - {} {} {}", handshakeData.getAuthToken(), handshakeData.getUrlParams(), handshakeData.getHttpHeaders().entries());
        return AuthorizationResult.SUCCESSFUL_AUTHORIZATION;
    }
}
