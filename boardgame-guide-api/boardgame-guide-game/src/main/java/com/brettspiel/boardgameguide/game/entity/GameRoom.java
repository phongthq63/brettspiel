package com.brettspiel.boardgameguide.game.entity;

import com.brettspiel.boardgameguide.game.entity.vo.RoomPlayer;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 5/15/2025 - 3:32 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document("game_room")
public class GameRoom extends BaseMongodbEntity {

    @Field("room_id")
    private String roomId;

    @Field("session_id")
    private String sessionId;

    @Field("game_id")
    private String gameId;

    private List<RoomPlayer> players;

    private Integer status;

    @Field("host_id")
    private String hostId;



    public static class Status {
        public static final int INIT = 0;
        public static final int WAITING = 1;
        public static final int STARTED = 2;
        public static final int FINISHED = 3;
    }
}
