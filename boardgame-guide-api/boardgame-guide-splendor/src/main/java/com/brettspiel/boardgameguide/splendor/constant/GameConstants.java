package com.brettspiel.boardgameguide.splendor.constant;

/**
 * Created by Quach Thanh Phong
 * On 11/16/2024 - 11:53 PM
 */
public class GameConstants {

    public final static int STATUS_INIT = 0;
    public final static int STATUS_START = 1;
    public final static int STATUS_END = 2;


    public final static String EVENT_INIT_GAME = "INIT_GAME";
    public final static String EVENT_START_GAME = "START_GAME";


    public final static String EVENT_END_TURN = "EVENT_END_TURN";


    public final static String EVENT_TURN_ACTION_SKIP = "TURN_ACTION_SKIP";
    public final static String EVENT_TURN_ACTION_GATHER_GEM = "TURN_ACTION_GATHER_GEM";
    public final static String EVENT_TURN_ACTION_BUY_CARD = "TURN_ACTION_BUY_CARD";
    public final static String EVENT_TURN_ACTION_RESERVE_CARD = "TURN_ACTION_RESERVE_CARD";

}
