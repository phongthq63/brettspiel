package com.brettspiel.boardgameguide.socket.handler;

import com.brettspiel.boardgameguide.socket.constant.GameSplendorConstants;
import com.brettspiel.boardgameguide.socket.constant.SocketConstants;
import com.brettspiel.socket.model.SocketModel;
import com.brettspiel.socket.service.ISocketIOService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 12/24/2024 - 11:34 AM
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class GameSplendorHandler {

    private final ISocketIOService socketIOService;



    public void handlerRoomMessage(String roomId, Map<String, Object> data) {
        Object eventType = data.get("event_type");
        if (eventType == null) {
            return;
        }

        String cmd;
        switch (eventType.toString()) {
            case GameSplendorConstants.EVENT_INIT_GAME:
                cmd = SocketConstants.NotifyGameSplendorInit;
                break;
            case GameSplendorConstants.EVENT_START_GAME:
                cmd = SocketConstants.NotifyGameSplendorStart;
                break;
            case GameSplendorConstants.EVENT_START_TURN:
                cmd = SocketConstants.NotifyGameSplendorTurnStart;
                break;
            case GameSplendorConstants.EVENT_END_TURN:
                cmd = SocketConstants.NotifyGameSplendorTurnEnd;
                break;
            case GameSplendorConstants.EVENT_TURN_ACTION_GATHER_GEM:
                cmd = SocketConstants.NotifyGameSplendorActionGatherGem;
                break;
            case GameSplendorConstants.EVENT_TURN_ACTION_BUY_CARD:
                cmd = SocketConstants.NotifyGameSplendorActionBuyCard;
                break;
            case GameSplendorConstants.EVENT_TURN_ACTION_RESERVE_CARD:
                cmd = SocketConstants.NotifyGameSplendorActionReserveCard;
                break;
            case GameSplendorConstants.EVENT_TURN_BONUS_ACTION_TAKE_NOBLE:
                cmd = SocketConstants.NotifyGameSplendorBonusActionTakeNoble;
                break;
            default:
                return;
        }

        // Send notify to room
        SocketModel<Object> socketModel = new SocketModel<>();
        socketModel.setCmd(cmd);
        socketModel.setData(data);
        socketIOService.broadcastMessageToRoom(roomId, SocketConstants.EVENT_GAME_SPLENDOR, socketModel);
    }
}
