package com.brettspiel.boardgameguide.splendor.controller;

import com.brettspiel.assist.SocketAssist;
import com.brettspiel.boardgameguide.splendor.constant.GameConstants;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import com.brettspiel.security.JwtHandler;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.UpdateDefinition;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 10/28/2024 - 2:56 PM
 */
@Slf4j
@Tag(name = "Test")
@RestController
@RequestMapping(value = "/test")
public class TestController {

    @Autowired
    private JwtHandler jwtHandler;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private SocketAssist socketAssist;



    @GetMapping("/token")
    public Object token(String accountId) {
        return jwtHandler.generateToken(accountId, new HashMap<>() {
            {
                put("name", "username");
            }
        });
    }

    @GetMapping("")
    public Object test() {
        String gameId = "6752d9043539d952dfc3b0ff";
        String playerId = "222";
        int gold = 0;
        int onyx = 0;
        int ruby = 0;
        int emerald = 0;
        int sapphire = 0;
        int diamond = 0;
        String cardId = "sapphire_1111";
        List<String> cardIds = Arrays.asList("diamond_1111");

        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("ingame_data.field_card_1").elemMatch(Criteria.where("card").is(null)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.field_card_1").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.field_card_1")
                                .as("field_card")
                                .andApply(ConditionalOperators.Cond
                                        .when(ConditionalOperators.IfNull
                                                .ifNull("field_card.card").then(false))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("field_card")
                                                .mergeWith(new Document()
                                                        .append("card", ArrayOperators.ArrayElemAt
                                                                .arrayOf("ingame_data.deck_card_1").elementAt(0))))
                                        .otherwiseValueOf("field_card")))
                        .and()
                        .set("ingame_data.deck_card_1").toValueOf(ArrayOperators.Slice
                                .sliceArrayOf("ingame_data.deck_card_1").offset(1).itemCount(999)));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);
        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }
}
