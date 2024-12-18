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
public class ServiceMessageRoomHandler implements SocketAssist.ISocketMessageRoomHandler {

    @Override
    public void handlerMessage(Map<String, Object> data) {
        log.info("ServiceMessageRoomHandler - handlerMessage - {}", data);
    }

}
