package com.brettspiel.boardgameguide.game.service;

import com.brettspiel.boardgameguide.game.controller.dto.request.SendFeedbackRequest;
import com.brettspiel.utils.R;

public interface IFeedbackService {

    R<?> sendFeedback(SendFeedbackRequest request);

}
