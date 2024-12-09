package com.brettspiel.boardgameguide.splendor.controller;

import com.brettspiel.boardgameguide.splendor.controller.dto.request.CreateNewGameRequest;
import com.brettspiel.boardgameguide.splendor.dto.SplendorTableDTO;
import com.brettspiel.boardgameguide.splendor.security.UserPrincipal;
import com.brettspiel.boardgameguide.splendor.service.ITableService;
import com.brettspiel.service.dto.PageDTO;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Quach Thanh Phong
 * On 11/17/2024 - 4:34 PM
 */
@Validated
@Tag(name = "Table")
@RestController
@RequestMapping(value = "/table")
@RequiredArgsConstructor
public class TableController {

    private final ITableService tableService;


    @PostMapping("")
    public R<SplendorTableDTO> createNewGame(@Parameter(hidden = true) Authentication authentication,
                                             @Valid @RequestBody CreateNewGameRequest body) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return tableService.createNewGame(userId, body);
    }

    @GetMapping("")
    public R<PageDTO<SplendorTableDTO>> getListTableInfo(@Parameter(hidden = true) Authentication authentication,
                                                         @Positive @Parameter(description = "Trang") @RequestParam(defaultValue = "0") Integer page,
                                                         @Positive @Parameter(description = "Số lượng") @RequestParam(defaultValue = "10") Integer size) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return tableService.getListTableInfo(userId, page, size);
    }

    @GetMapping("/{tableId}")
    public R<SplendorTableDTO> getTableInfo(@Parameter(hidden = true) Authentication authentication,
                                            @PathVariable String tableId) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getId();

        return tableService.getTableInfo(userId, tableId);
    }

}
