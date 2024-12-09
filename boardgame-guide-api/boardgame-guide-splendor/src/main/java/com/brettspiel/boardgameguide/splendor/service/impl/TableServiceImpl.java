package com.brettspiel.boardgameguide.splendor.service.impl;

import com.brettspiel.boardgameguide.splendor.constant.TableConstants;
import com.brettspiel.boardgameguide.splendor.controller.dto.request.CreateNewGameRequest;
import com.brettspiel.boardgameguide.splendor.dto.SplendorTableDTO;
import com.brettspiel.boardgameguide.splendor.entity.SplendorTable;
import com.brettspiel.boardgameguide.splendor.mapper.ITableMapper;
import com.brettspiel.boardgameguide.splendor.repository.ISplendorTableRepository;
import com.brettspiel.boardgameguide.splendor.service.ITableService;
import com.brettspiel.boardgameguide.splendor.utils.GameUtils;
import com.brettspiel.service.dto.PageDTO;
import com.brettspiel.utils.IdGenerator;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Quach Thanh Phong
 * On 11/17/2024 - 5:36 PM
 */
@Service
@RequiredArgsConstructor
public class TableServiceImpl implements ITableService {

    private final ISplendorTableRepository splendorTableRepository;

    private final ITableMapper tableMapper;

    private final GameUtils gameUtils;



    @Override
    public R<SplendorTableDTO> createNewGame(String userId, CreateNewGameRequest body) {
        if (!gameUtils.getNumberPlayerAvailable().contains(body.getNumberPlayer())) {
            return R.ok("Number player invalid");
        }

        // Create game data
        SplendorTable splendorTable = SplendorTable.builder()
                .tableId(IdGenerator.nextObjectId())
                .numberPlayer(body.getNumberPlayer())
                .userIds(Collections.singletonList(userId))
                .status(TableConstants.STATUS_WAITING)
                .hostId(userId)
                .build();
        splendorTable = splendorTableRepository.insert(splendorTable);
        return R.ok(tableMapper.toSplendorTableDTO(splendorTable));
    }

    @Override
    public R<PageDTO<SplendorTableDTO>> getListTableInfo(String userId, Integer page, Integer size) {
        List<SplendorTable> splendorTables = splendorTableRepository.getList(page, size);
        long count = splendorTableRepository.count();

        PageDTO.PageDTOBuilder<SplendorTableDTO> splendorTableDTOPageDTOBuilder = PageDTO.builder();
        PageDTO<SplendorTableDTO> pageDTO = splendorTableDTOPageDTOBuilder
                .list(splendorTables.stream()
                        .map(tableMapper::toSplendorTableDTO)
                        .collect(Collectors.toList()))
                .page(page)
                .size(size)
                .total(count)
                .build();
        return R.ok(pageDTO);
    }

    @Override
    public R<SplendorTableDTO> getTableInfo(String userId, String tableId) {
        SplendorTable splendorTable = splendorTableRepository.getById(tableId);
        if (splendorTable == null) {
            return R.failed("Table not found");
        }

        return R.ok(tableMapper.toSplendorTableDTO(splendorTable));
    }

}
