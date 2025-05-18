package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 2:39 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document("user")
public class User extends BaseMongodbEntity {

    @Field("user_id")
    private String userId;

    private String name;

    @Field("avatar_url")
    private String avatarUrl;

}
