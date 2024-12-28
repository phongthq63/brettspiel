package com.brettspiel.boardgameguide.socket.consumer.servicemessage;

import com.brettspiel.assist.SocketAssist;
import com.brettspiel.boardgameguide.constant.ServiceConstants;
import com.brettspiel.boardgameguide.socket.handler.GameSplendorHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 12/13/2024 - 4:26 PM
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ServiceMessageRoomConsumer implements SocketAssist.ISocketMessageRoomHandler {

    private final GameSplendorHandler gameSplendorHandler;

    @Override
    public void handlerMessage(Map<String, Object> data) {
        log.info("ServiceMessageRoomHandler - handlerMessage - {}", data);

        Object roomId =  data.get("room_id");
        Object messageData =  data.get("data");
        if (roomId == null || messageData == null) {
            return;
        }

        Object serviceType = ((Map<String, Object>) messageData).get("service_type");
        if (serviceType == null) {
            return;
        }

        switch (serviceType.toString()) {
            case ServiceConstants.SERVICE_GAME_SPLENDOR:
                gameSplendorHandler.handlerRoomMessage(roomId.toString(), (Map<String, Object>) messageData);
                break;
            default:
        }
    }

}
