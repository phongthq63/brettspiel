package com.brettspiel.boardgameguide.game.controller;

import com.brettspiel.boardgameguide.game.controller.dto.request.SendFeedbackRequest;
import com.brettspiel.boardgameguide.game.service.IFeedbackService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@Tag(name = "Feedback")
@RestController
@RequestMapping(value = "/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final IFeedbackService feedbackService;


    @PostMapping("")
    public R<?> sendFeedback(@Valid @RequestBody SendFeedbackRequest request) {
        return feedbackService.sendFeedback(request);
    }

}
