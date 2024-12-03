package com.brettspiel.boardgameguide.splendor.constant;

/**
 * Created by Quach Thanh Phong
 * On 11/16/2024 - 11:53 PM
 */
public class GameConstants {

    public final static int STATUS_INIT = 0;
    public final static int STATUS_START = 1;


    public final static int ACTION_TYPE_SKIP = 0;
    public final static int ACTION_TYPE_GATHER_GEM = 1;
    public final static int ACTION_TYPE_BUY_CARD = 2;
    public final static int ACTION_TYPE_RESERVE_CARD = 3;


    public final static String EVENT_INIT_GAME = "INIT_GAME";
    public final static String EVENT_START_GAME = "START_GAME";


    public final static String EVENT_END_TURN = "EVENT_END_TURN";


    public final static String EVENT_TURN_ACTION_SKIP = "TURN_ACTION_SKIP";
    public final static String EVENT_TURN_ACTION_GATHER_GEM = "TURN_ACTION_GATHER_GEM";

}
