package com.brettspiel.boardgameguide.splendor.consumer;

import com.brettspiel.boardgameguide.splendor.service.IGameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.kafka.retrytopic.SameIntervalTopicReuseStrategy;
import org.springframework.kafka.retrytopic.TopicSuffixingStrategy;
import org.springframework.retry.annotation.Backoff;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 5/19/2025 - 5:45 PM
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class GameConsumer {

    private final IGameService gameService;


    @RetryableTopic(
            attempts = "${spring.kafka.consumer.retry}",
            backoff = @Backoff(delay = 60000),
            topicSuffixingStrategy = TopicSuffixingStrategy.SUFFIX_WITH_INDEX_VALUE,
            sameIntervalTopicReuseStrategy = SameIntervalTopicReuseStrategy.SINGLE_TOPIC)
    @KafkaListener(
            topics = { "${spring.kafka.consumer.topic.game-start-play}" },
            groupId = "${spring.kafka.consumer.groupId}.GameConsumer",
            autoStartup = "${spring.kafka.consumer.enable}")
    public void processStartPlayGame(Map<String, Object> data) throws Exception {
        gameService.initGame(data);
    }

}
