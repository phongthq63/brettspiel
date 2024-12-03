package com.brettspiel.boardgameguide.splendor.entity;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/13/2024 - 4:13 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@Document("splendor_table")
public class SplendorTable extends BaseMongodbEntity {

    @Field("table_id")
    private String tableId;

    @Field("number_player")
    private Integer numberPlayer;

    @Field("user_ids")
    private List<String> userIds;

    private Integer status;

    @Field("host_id")
    private String hostId;

}
