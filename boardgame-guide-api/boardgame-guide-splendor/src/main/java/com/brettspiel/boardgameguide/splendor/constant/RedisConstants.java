package com.brettspiel.boardgameguide.splendor.constant;

import cn.hutool.core.util.StrUtil;

/**
 * Created by Quach Thanh Phong
 * On 11/17/2024 - 1:35 PM
 */
public class RedisConstants {

    private static final String INVITE_CODE_JOIN_GAME_KEY = "invite_code_join_game";


    /*----------------------------------------------------------------------------------------------------------------*/

    public static String getInviteCodeJoinGameKey(String gameId, String code) {
        return StrUtil.format("{}_{}_{}", INVITE_CODE_JOIN_GAME_KEY, gameId, code);
    }
}
