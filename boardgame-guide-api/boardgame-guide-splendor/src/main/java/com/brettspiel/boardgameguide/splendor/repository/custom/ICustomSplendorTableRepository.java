package com.brettspiel.boardgameguide.splendor.repository.custom;

import com.brettspiel.boardgameguide.splendor.entity.SplendorTable;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/17/2024 - 5:47 PM
 */
public interface ICustomSplendorTableRepository {

    SplendorTable getById(String tableId);

    SplendorTable getByIdAndHost(String tableId, String hostId);

    List<SplendorTable> getList(Integer page, Integer size);

    SplendorTable initGame(String tableId);

}
