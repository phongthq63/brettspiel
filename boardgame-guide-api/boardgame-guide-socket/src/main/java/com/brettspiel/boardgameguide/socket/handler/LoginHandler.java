package com.brettspiel.boardgameguide.socket.handler;

import com.brettspiel.security.JwtHandler;
import com.brettspiel.security.VerificationResult;
import com.brettspiel.socket.helper.ClientHelper;
import com.corundumstudio.socketio.AuthorizationListener;
import com.corundumstudio.socketio.AuthorizationResult;
import com.corundumstudio.socketio.HandshakeData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by Quách Thanh Phong
 * On 7/3/2023 - 12:46 AM
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class LoginHandler implements AuthorizationListener {

    @Value("${socket-io.authentication:#{false}}")
    private boolean authentication;

    private final JwtHandler jwtHandler;



    @Override
    public AuthorizationResult getAuthorizationResult(HandshakeData handshakeData) {
        if (!authentication) {
            return AuthorizationResult.SUCCESSFUL_AUTHORIZATION;
        }

        // Verify token in param
        String token = handshakeData.getSingleUrlParam("token");
        VerificationResult tokenResult = jwtHandler.verify(token);
        if (!tokenResult.isValidated()) {
            return AuthorizationResult.FAILED_AUTHORIZATION;
        }

        // Set user id to header
        ClientHelper.setClientId(handshakeData, tokenResult.getSub());
        return AuthorizationResult.SUCCESSFUL_AUTHORIZATION;
    }
}
