package com.brettspiel.boardgameguide.socket.handler;

import com.brettspiel.boardgameguide.socket.constant.GameSplendorConstants;
import com.brettspiel.boardgameguide.socket.service.ISplendorService;
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

    private final ISplendorService splendorService;



    public void handlerRoomMessage(String roomId, Map<String, Object> data) {
        Object eventType = data.get("event_type");
        if (eventType == null) {
            return;
        }

        switch (eventType.toString()) {
            case GameSplendorConstants.EVENT_INIT_GAME:
                splendorService.handlerGameInit(roomId, data);
                break;
            case GameSplendorConstants.EVENT_START_GAME:
                splendorService.handlerGameStart(roomId, data);
                break;
            case GameSplendorConstants.EVENT_START_TURN:
                splendorService.handlerTurnStart(roomId, data);
                break;
            case GameSplendorConstants.EVENT_END_TURN:
                splendorService.handlerTurnEnd(roomId, data);
                break;
            case GameSplendorConstants.EVENT_TURN_ACTION_GATHER_GEM:
                splendorService.handlerTurnActionGatherGem(roomId, data);
                break;
            case GameSplendorConstants.EVENT_TURN_ACTION_BUY_CARD:
                splendorService.handlerTurnActionBuyCard(roomId, data);
                break;
            case GameSplendorConstants.EVENT_TURN_ACTION_RESERVE_CARD:
                splendorService.handlerTurnActionReserveCard(roomId, data);
                break;
            case GameSplendorConstants.EVENT_TURN_BONUS_ACTION_TAKE_NOBLE:
                splendorService.handlerTurnBonusActionTakeNoble(roomId, data);
                break;
        }
    }

}
