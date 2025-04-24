package com.brettspiel.boardgameguide.game.service.impl;

import com.brettspiel.boardgameguide.game.controller.dto.request.SendContactRequest;
import com.brettspiel.boardgameguide.game.service.IContactService;
import com.brettspiel.utils.IdGenerator;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements IContactService {

    private final static String TOPIC_PUBLISH_CONTACT = "brettspiel.game-service.contact";

    private final KafkaTemplate<String, Object> kafkaTemplate;


    @Override
    public R<?> sendContact(SendContactRequest request) {
        Map<String, Object> contactData = new HashMap<>();
        contactData.put("name", request.getName());
        contactData.put("email", request.getEmail());
        contactData.put("subject", request.getSubject());
        contactData.put("message", request.getMessage());
        kafkaTemplate.send(TOPIC_PUBLISH_CONTACT, IdGenerator.nextUUID(), contactData);

        return R.ok();
    }

}
