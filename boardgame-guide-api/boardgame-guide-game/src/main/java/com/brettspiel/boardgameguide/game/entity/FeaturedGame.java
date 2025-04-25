package com.brettspiel.boardgameguide.game.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/25/2025 - 10:58 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Document("featured_game")
public class FeaturedGame extends BaseMongodbEntity {

    private String title;

    private String description;

    private String duration;

    private String players;

    private String image;

    private String badge;

    private List<String> tags;

}
