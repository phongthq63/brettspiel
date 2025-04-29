package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 4:33 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document("genre")
public class Genre extends BaseMongodbEntity {

    @Field("genre_id")
    private String genreId;

    private String name;

}
