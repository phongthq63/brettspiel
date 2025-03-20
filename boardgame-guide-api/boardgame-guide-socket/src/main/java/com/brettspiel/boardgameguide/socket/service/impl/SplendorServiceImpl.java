package com.brettspiel.boardgameguide.socket.service.impl;

import com.brettspiel.boardgameguide.socket.constant.SocketConstants;
import com.brettspiel.boardgameguide.socket.service.ISplendorService;
import com.brettspiel.socket.model.SocketModel;
import com.brettspiel.socket.service.ISocketIOService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 12/24/2024 - 2:04 PM
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SplendorServiceImpl implements ISplendorService {

    private final ISocketIOService socketIOService;


    @Override
    public void handlerGameInit(String tableId, Map<String, Object> data) {
        // Send notify to room
        SocketModel<Object> socketModel = new SocketModel<>();
        socketModel.setCmd(SocketConstants.NotifyGameSplendorInit);
        socketModel.setData(data);
        socketIOService.broadcastMessageToRoom(tableId, SocketConstants.EVENT_GAME_SPLENDOR, socketModel);
    }

    @Override
    public void handlerGameStart(String gameId, Map<String, Object> data) {
        // Send notify to room
        SocketModel<Object> socketModel = new SocketModel<>();
        socketModel.setCmd(SocketConstants.NotifyGameSplendorStart);
        socketModel.setData(data);
        socketIOService.broadcastMessageToRoom(gameId, SocketConstants.EVENT_GAME_SPLENDOR, socketModel);
    }

    @Override
    public void handlerTurnStart(String gameId, Map<String, Object> data) {
        // Send notify to room
        SocketModel<Object> socketModel = new SocketModel<>();
        socketModel.setCmd(SocketConstants.NotifyGameSplendorTurnStart);
        socketModel.setData(data);
        socketIOService.broadcastMessageToRoom(gameId, SocketConstants.EVENT_GAME_SPLENDOR, socketModel);
    }

    @Override
    public void handlerTurnEnd(String gameId, Map<String, Object> data) {
        // Send notify to room
        SocketModel<Object> socketModel = new SocketModel<>();
        socketModel.setCmd(SocketConstants.NotifyGameSplendorTurnEnd);
        socketModel.setData(data);
        socketIOService.broadcastMessageToRoom(gameId, SocketConstants.EVENT_GAME_SPLENDOR, socketModel);
    }

    @Override
    public void handlerTurnActionGatherGem(String gameId, Map<String, Object> data) {
        // Send notify to room
        SocketModel<Object> socketModel = new SocketModel<>();
        socketModel.setCmd(SocketConstants.NotifyGameSplendorActionGatherGem);
        socketModel.setData(data);
        socketIOService.broadcastMessageToRoom(gameId, SocketConstants.EVENT_GAME_SPLENDOR, socketModel);
    }

    @Override
    public void handlerTurnActionBuyCard(String gameId, Map<String, Object> data) {
        // Send notify to room
        SocketModel<Object> socketModel = new SocketModel<>();
        socketModel.setCmd(SocketConstants.NotifyGameSplendorActionBuyCard);
        socketModel.setData(data);
        socketIOService.broadcastMessageToRoom(gameId, SocketConstants.EVENT_GAME_SPLENDOR, socketModel);
    }

    @Override
    public void handlerTurnActionReserveCard(String gameId, Map<String, Object> data) {
        // Send notify to room
        SocketModel<Object> socketModel = new SocketModel<>();
        socketModel.setCmd(SocketConstants.NotifyGameSplendorActionReserveCard);
        socketModel.setData(data);
        socketIOService.broadcastMessageToRoom(gameId, SocketConstants.EVENT_GAME_SPLENDOR, socketModel);
    }

    @Override
    public void handlerTurnBonusActionTakeNoble(String gameId, Map<String, Object> data) {
        // Send notify to room
        SocketModel<Object> socketModel = new SocketModel<>();
        socketModel.setCmd(SocketConstants.NotifyGameSplendorBonusActionTakeNoble);
        socketModel.setData(data);
        socketIOService.broadcastMessageToRoom(gameId, SocketConstants.EVENT_GAME_SPLENDOR, socketModel);
    }

}
