package com.brettspiel.boardgameguide.game.service.impl;

import com.brettspiel.boardgameguide.game.controller.dto.request.SendFeedbackRequest;
import com.brettspiel.boardgameguide.game.service.IFeedbackService;
import com.brettspiel.utils.IdGenerator;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements IFeedbackService {

    @Value("${spring.kafka.producer.topic.feedback}")
    private String topicFeedback;

    private final KafkaTemplate<String, Object> kafkaTemplate;


    @Override
    public R<?> sendFeedback(SendFeedbackRequest request) {
        Map<String, Object> contactData = new HashMap<>();
        contactData.put("name", request.getName());
        contactData.put("email", request.getEmail());
        contactData.put("subject", request.getSubject());
        contactData.put("message", request.getMessage());
        kafkaTemplate.send(topicFeedback, IdGenerator.nextUUID(), contactData);

        return R.ok();
    }
}
