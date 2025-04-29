package com.brettspiel.boardgameguide.game.controller;

import com.brettspiel.boardgameguide.game.controller.dto.request.SendContactRequest;
import com.brettspiel.boardgameguide.game.service.IContactService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@Tag(name = "Contact", description = "API để gửi thông tin liên hệ")
@RestController
@RequestMapping(value = "/contact")
@RequiredArgsConstructor
public class ContactController {

    private final IContactService contactService;

    @PostMapping("")
    @Operation(summary = "Gửi thông tin liên hệ", description = "API này cho phép người dùng gửi thông tin liên hệ đến hệ thống.")
    public R<?> sendContact(@Valid @RequestBody SendContactRequest request) {
        return contactService.sendContact(request);
    }

}
