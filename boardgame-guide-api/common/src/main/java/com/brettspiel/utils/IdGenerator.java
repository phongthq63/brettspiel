package com.brettspiel.utils;

import cn.hutool.core.lang.Snowflake;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.extra.spring.SpringUtil;

public final class IdGenerator {
    private static final Snowflake SNOWFLAKE;

    static {
        String workerIdStr = SpringUtil.getProperty("snowflake.worker-id", "1");
        String clusterIdStr = SpringUtil.getProperty("snowflake.cluster-id", "1");
        SNOWFLAKE = IdUtil.getSnowflake(NumberUtil.parseInt(workerIdStr), NumberUtil.parseInt(clusterIdStr));
    }

    /**
     * Get Snowflake ID
     * @return long id
     */
    public static long nextId(){
        return SNOWFLAKE.nextId();
    }

    /**
     * Get UUID
     * @return UUID in simple format:b17f24ff026d40949c85a24f4f375d42
     */
    public static String nextUUID(){
        return IdUtil.simpleUUID();
    }

    /**
     * Used for MongoDB
     * @return MongoDB ObjectId in string format
     */
    public static String nextObjectId() {
        return IdUtil.objectId();
    }
}
