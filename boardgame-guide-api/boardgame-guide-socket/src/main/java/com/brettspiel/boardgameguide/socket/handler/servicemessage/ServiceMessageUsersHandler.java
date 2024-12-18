package com.brettspiel.boardgameguide.socket.handler.servicemessage;

import com.brettspiel.assist.SocketAssist;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 12/13/2024 - 4:26 PM
 */
@Slf4j
@Component
public class ServiceMessageUsersHandler implements SocketAssist.ISocketMessageUsersHandler {

    @Override
    public void handlerMessage(Map<String, Object> data) {
        log.info("ServiceMessageUsersHandler - handlerMessage - {}", data);
    }

}
