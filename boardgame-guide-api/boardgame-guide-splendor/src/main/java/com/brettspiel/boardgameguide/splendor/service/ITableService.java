package com.brettspiel.boardgameguide.splendor.service;

import com.brettspiel.boardgameguide.splendor.controller.dto.request.CreateNewGameRequest;
import com.brettspiel.boardgameguide.splendor.dto.SplendorTableDTO;
import com.brettspiel.service.dto.PageDTO;
import com.brettspiel.utils.R;

/**
 * Created by Quach Thanh Phong
 * On 11/17/2024 - 5:36 PM
 */
public interface ITableService {

    R<SplendorTableDTO> createNewGame(String userId, CreateNewGameRequest body);

    R<PageDTO<SplendorTableDTO>> getListTableInfo(String userId, Integer page, Integer size);

    R<SplendorTableDTO> getTableInfo(String userId, String tableId);

}
