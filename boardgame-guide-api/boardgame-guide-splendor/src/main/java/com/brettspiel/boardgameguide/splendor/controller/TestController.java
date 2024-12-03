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

import java.util.HashMap;

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
        String gameId = "674e87e95cbb583e9082cbd5";
        String playerId = "222";
        int gold = 0;
        int onyx = 1;
        int ruby = 0;
        int emerald = 0;
        int sapphire = 0;
        int diamond = 0;
        String cardId = "sapphire_1111";

        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.players").elemMatch(Criteria.where("player_id").is(playerId)
                        .and("gold").gte(-gold)
                        .and("onyx").gte(-onyx)
                        .and("ruby").gte(-ruby)
                        .and("emerald").gte(-emerald)
                        .and("sapphire").gte(-sapphire)
                        .and("diamond").gte(-diamond))
                .and("ingame_data.field_card_1").elemMatch(Criteria.where("card.id").is(cardId)));
        UpdateDefinition update = AggregationUpdate.update().set(SetOperation.builder()
                .set("ingame_data.gold").toValueOf(AccumulatorOperators.Sum.sumOf("ingame_data.gold").and(-gold))
                .and()
                .set("ingame_data.onyx").toValueOf(AccumulatorOperators.Sum.sumOf("ingame_data.onyx").and(-onyx))
                .and()
                .set("ingame_data.ruby").toValueOf(AccumulatorOperators.Sum.sumOf("ingame_data.ruby").and(-ruby))
                .and()
                .set("ingame_data.emerald").toValueOf(AccumulatorOperators.Sum.sumOf("ingame_data.emerald").and(-emerald))
                .and()
                .set("ingame_data.sapphire").toValueOf(AccumulatorOperators.Sum.sumOf("ingame_data.sapphire").and(-sapphire))
                .and()
                .set("ingame_data.diamond").toValueOf(AccumulatorOperators.Sum.sumOf("ingame_data.diamond").and(-diamond))
                .and()
                .set("ingame_data.players").toValueOf(VariableOperators.Map
                        .itemsOf("ingame_data.players")
                        .as("player")
                        .andApply(ObjectOperators.MergeObjects
                                .mergeValuesOf("player")
                                .mergeWithValuesOf(ConditionalOperators.Cond.newBuilder()
                                        .when(ComparisonOperators.Eq.valueOf("player.player_id").equalToValue(playerId))
                                        .then(new Document()
                                                .append("gold", ArithmeticOperators.Subtract.valueOf("$$player.gold").subtract(-gold))
                                                .append("onyx", ArithmeticOperators.Subtract.valueOf("$$player.onyx").subtract(-onyx))
                                                .append("ruby", ArithmeticOperators.Subtract.valueOf("$$player.ruby").subtract(-ruby))
                                                .append("emerald", ArithmeticOperators.Subtract.valueOf("$$player.emerald").subtract(-emerald))
                                                .append("sapphire", ArithmeticOperators.Subtract.valueOf("$$player.sapphire").subtract(-sapphire))
                                                .append("diamond", ArithmeticOperators.Subtract.valueOf("$$player.diamond").subtract(-diamond))
                                                .append("cards", ArrayOperators.ConcatArrays
                                                        .arrayOf("$$player.cards")
                                                        .concat(VariableOperators.Map
                                                                .itemsOf(ArrayOperators.Filter
                                                                        .filter("ingame_data.field_card_1")
                                                                        .as("field_card_1")
                                                                        .by(ComparisonOperators.Eq
                                                                                .valueOf("field_card_1.card.id")
                                                                                .equalToValue(cardId)))
                                                                .as("field_card")
                                                                .andApply(ObjectOperators.GetField.getField("card").of("field_card")))))
                                        .otherwiseValueOf("player")))));

        return mongoTemplate.findAndModify(query, update, SplendorGame.class);
    }
}
