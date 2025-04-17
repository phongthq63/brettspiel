package com.brettspiel.assist;

import com.brettspiel.constants.SocketConstants;
import com.brettspiel.utils.IdGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.retrytopic.SameIntervalTopicReuseStrategy;
import org.springframework.kafka.retrytopic.TopicSuffixingStrategy;
import org.springframework.retry.annotation.Backoff;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 11/18/2024 - 4:26 PM
 */
@Slf4j
@Lazy
@Component
@RequiredArgsConstructor
public class SocketAssist {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public final List<ISocketMessageUserHandler> socketMessageUserHandlers;
    public final List<ISocketMessageUsersHandler> socketMessageUsersHandlers;
    public final List<ISocketMessageRoomHandler> socketMessageRoomHandlers;
    public final List<ISocketMessageAllHandler> socketMessageAllHandlers;



    public void broadcastMessageToUser(String userId, Map<String, Object> data) {
        Map<String, Object> socketData = new HashMap<>();
        socketData.put("user_id", userId);
        socketData.put("data", data);
        socketData.put("ts", System.currentTimeMillis());
        kafkaTemplate.send(SocketConstants.TOPIC_PUBLISH_MESSAGE_USER, IdGenerator.nextUUID(), socketData);
    }

    public void broadcastMessageToUsers(List<String> userIds, Map<String, Object> data) {
        Map<String, Object> socketData = new HashMap<>();
        socketData.put("user_ids", userIds);
        socketData.put("data", data);
        socketData.put("ts", System.currentTimeMillis());
        kafkaTemplate.send(SocketConstants.TOPIC_PUBLISH_MESSAGE_USERS, IdGenerator.nextUUID(), socketData);
    }

    public void broadcastMessageToRoom(String roomId, Map<String, Object> data) {
        Map<String, Object> socketData = new HashMap<>();
        socketData.put("room_id", roomId);
        socketData.put("data", data);
        socketData.put("ts", System.currentTimeMillis());
        kafkaTemplate.send(SocketConstants.TOPIC_PUBLISH_MESSAGE_ROOM, IdGenerator.nextUUID(), socketData);
    }

    public void broadMessageToAll(Map<String, Object> data) {
        Map<String, Object> socketData = new HashMap<>();
        socketData.put("data", data);
        socketData.put("ts", System.currentTimeMillis());
        kafkaTemplate.send(SocketConstants.TOPIC_PUBLISH_MESSAGE_ALL, IdGenerator.nextUUID(), socketData);
    }



    @Component
    public class SocketAssistHandler {

        @RetryableTopic(
                attempts = "${spring.kafka.consumer.retry:1}",
                backoff = @Backoff(delay = 60000),
                topicSuffixingStrategy = TopicSuffixingStrategy.SUFFIX_WITH_INDEX_VALUE,
                sameIntervalTopicReuseStrategy = SameIntervalTopicReuseStrategy.SINGLE_TOPIC)
        @KafkaListener(
                topics = { SocketConstants.TOPIC_PUBLISH_MESSAGE_USER },
                groupId = "${spring.kafka.consumer.groupId:common}.SocketAssist",
                autoStartup = "#{!socketAssist.socketMessageUserHandlers.isEmpty()}")
        public void processMessageUser(Map<String, Object> data) throws Exception {
            socketMessageUserHandlers.forEach(socketMessageUserHandler -> socketMessageUserHandler.handlerMessage(data));
        }

        @RetryableTopic(
                attempts = "${spring.kafka.consumer.retry:1}",
                backoff = @Backoff(delay = 60000),
                topicSuffixingStrategy = TopicSuffixingStrategy.SUFFIX_WITH_INDEX_VALUE,
                sameIntervalTopicReuseStrategy = SameIntervalTopicReuseStrategy.SINGLE_TOPIC)
        @KafkaListener(
                topics = { SocketConstants.TOPIC_PUBLISH_MESSAGE_USERS },
                groupId = "${spring.kafka.consumer.groupId:common}.SocketAssist",
                autoStartup = "#{!socketAssist.socketMessageUsersHandlers.isEmpty()}")
        public void processMessageUsers(Map<String, Object> data) throws Exception {
            socketMessageUsersHandlers.forEach(socketMessageUsersHandler -> socketMessageUsersHandler.handlerMessage(data));
        }

        @RetryableTopic(
                attempts = "${spring.kafka.consumer.retry:1}",
                backoff = @Backoff(delay = 60000),
                topicSuffixingStrategy = TopicSuffixingStrategy.SUFFIX_WITH_INDEX_VALUE,
                sameIntervalTopicReuseStrategy = SameIntervalTopicReuseStrategy.SINGLE_TOPIC)
        @KafkaListener(
                topics = { SocketConstants.TOPIC_PUBLISH_MESSAGE_ROOM },
                groupId = "${spring.kafka.consumer.groupId:common}.SocketAssist",
                autoStartup = "#{!socketAssist.socketMessageRoomHandlers.isEmpty()}")
        public void processMessageRoom(Map<String, Object> data) throws Exception {
            socketMessageRoomHandlers.forEach(socketMessageRoomHandler -> socketMessageRoomHandler.handlerMessage(data));
        }

        @RetryableTopic(
                attempts = "${spring.kafka.consumer.retry:1}",
                backoff = @Backoff(delay = 60000),
                topicSuffixingStrategy = TopicSuffixingStrategy.SUFFIX_WITH_INDEX_VALUE,
                sameIntervalTopicReuseStrategy = SameIntervalTopicReuseStrategy.SINGLE_TOPIC)
        @KafkaListener(
                topics = { SocketConstants.TOPIC_PUBLISH_MESSAGE_ALL },
                groupId = "${spring.kafka.consumer.groupId:common}.SocketAssist",
                autoStartup = "#{!socketAssist.socketMessageAllHandlers.isEmpty()}")
        public void processMessageAll(Map<String, Object> data) throws Exception {
            socketMessageAllHandlers.forEach(socketMessageAllHandler -> socketMessageAllHandler.handlerMessage(data));
        }
    }

    public interface ISocketMessageUserHandler {
        void handlerMessage(Map<String, Object> data);
    }

    public interface ISocketMessageUsersHandler {
        void handlerMessage(Map<String, Object> data);
    }

    public interface ISocketMessageRoomHandler {
        void handlerMessage(Map<String, Object> data);
    }

    public interface ISocketMessageAllHandler {
        void handlerMessage(Map<String, Object> data);
    }
}
