package com.brettspiel.assist;

import com.brettspiel.constants.SocketConstants;
import com.brettspiel.utils.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 11/18/2024 - 4:26 PM
 */
@Component
public class SocketAssist {

    @Autowired(required = false)
    private KafkaTemplate<String, Object> kafkaTemplate;



    public void sendMessageToUser(String userId, Map<String, Object> data) {
        kafkaTemplate.send(SocketConstants.TOPIC_PUBLISH_MESSAGE_USER, IdGenerator.nextUUID(), new HashMap<>() {
            {
                put("user_id", userId);
                put("data", data);
            }
        });
    }

    public void sendMessageToUsers(List<String> userIds, Map<String, Object> data) {
        kafkaTemplate.send(SocketConstants.TOPIC_PUBLISH_MESSAGE_USERS, IdGenerator.nextUUID(), new HashMap<>() {
            {
                put("user_ids", userIds);
                put("data", data);
            }
        });
    }

    public void broadcastMessageToRoom(String roomId, Map<String, Object> data) {
        kafkaTemplate.send(SocketConstants.TOPIC_PUBLISH_MESSAGE_ROOM, IdGenerator.nextUUID(), new HashMap<>() {
            {
                put("room_id", roomId);
                put("data", data);
            }
        });
    }

    public void broadMessageToAll(Map<String, Object> data) {
        kafkaTemplate.send(SocketConstants.TOPIC_PUBLISH_MESSAGE_ALL, IdGenerator.nextUUID(), new HashMap<>() {
            {
                put("data", data);
            }
        });
    }

}
