package com.brettspiel.utils;

import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Date;

/**
 * Created by Quach Thanh Phong
 * On 10/17/2023 - 3:59 PM
 */
@Component
public class MssqlUtils {

    public static long timeDB() {
        return Instant.now().toEpochMilli() + 7 * 3600 * 1000;
    }

    public static long toTimeDB(long timestamp) {
        return timestamp + 7 * 3600 * 1000;
    }

    public static long timestampFromDB(long timeDB) {
        return timeDB - 7 * 3600 * 1000;
    }

    public static Date toDateDB(Date date) {
        ZonedDateTime zonedDateTimeFrom = ZonedDateTime.ofInstant(date.toInstant(), ZoneOffset.UTC)
                .withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"));
        return Date.from(zonedDateTimeFrom.toInstant());
    }

    public static long timestampSecondFromDB(Timestamp timestamp) {
        return timestamp.toInstant().getEpochSecond();
    }

    public static long timestampSecondFromDB(Date date) {
        return date.toInstant().getEpochSecond();
    }

}
