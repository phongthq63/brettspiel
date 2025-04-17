package com.brettspiel.boardgameguide.game.service;

import com.brettspiel.boardgameguide.game.controller.dto.request.SendContactRequest;
import com.brettspiel.utils.R;

public interface IContactService {

    R<?> sendContact(SendContactRequest request);

}
