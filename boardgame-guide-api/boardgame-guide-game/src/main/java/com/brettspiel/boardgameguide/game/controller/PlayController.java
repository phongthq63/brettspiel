package com.brettspiel.boardgameguide.game.controller;

import com.brettspiel.boardgameguide.game.controller.dto.request.StartPlayRequest;
import com.brettspiel.boardgameguide.game.security.UserPrincipal;
import com.brettspiel.boardgameguide.game.service.IPlayService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Quach Thanh Phong
 * On 5/14/2025 - 4:47 PM
 */
@Validated
@Tag(name = "Play", description = "API để chơi trò chơi")
@RestController
@RequestMapping(value = "/play")
@RequiredArgsConstructor
public class PlayController {

    private final IPlayService playService;


    @PostMapping("")
    public R<?> startPlay(@Parameter(hidden = true) Authentication authentication,
                          @Valid @RequestBody StartPlayRequest request) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return playService.startPlay(userId, request);
    }

}
