package com.brettspiel.boardgameguide.splendor.repository.impl;

import cn.hutool.core.util.StrUtil;
import com.brettspiel.boardgameguide.splendor.constant.GameConstants;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGame;
import com.brettspiel.boardgameguide.splendor.entity.vo.Card;
import com.brettspiel.boardgameguide.splendor.entity.vo.Noble;
import com.brettspiel.boardgameguide.splendor.repository.custom.ICustomSplendorGameRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.query.UpdateDefinition;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.IntStream;

/**
 * Created by Quach Thanh Phong
 * On 11/13/2024 - 5:18 PM
 */
@Repository
public class ISplendorGameRepositoryImpl implements ICustomSplendorGameRepository {

    @Autowired
    private MongoTemplate mongoTemplate;


    @Override
    public SplendorGame findById(String gameId) {
        Query query = Query.query(Criteria.where("game_id").is(gameId));

        return mongoTemplate.findOne(query, SplendorGame.class);
    }

    @Override
    public SplendorGame findGameUserIn(String gameId, String userId) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                        .and("player_ids").all(userId));

        return mongoTemplate.findOne(query, SplendorGame.class);
    }

    @Override
    public SplendorGame startGame(String gameId, List<Noble> deckNoble, List<Noble> fieldNoble, List<Card> deckCard1, List<Card> deckCard2, List<Card> deckCard3, List<Card> fieldCard1, List<Card> fieldCard2, List<Card> fieldCard3) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_INIT));
        Update update = new Update();
        update.set("status", GameConstants.STATUS_START);
        update.set("ingame_data.deck_noble", deckNoble);
        update.set("ingame_data.deck_card_1", deckCard1);
        update.set("ingame_data.deck_card_2", deckCard2);
        update.set("ingame_data.deck_card_3", deckCard3);
        IntStream.range(0, fieldNoble.size())
                .forEach(index -> {
                    update.set(StrUtil.format("ingame_data.field_noble.{}.noble", index), fieldNoble.get(index));
                });
        IntStream.range(0, fieldCard1.size())
                .forEach(index -> {
                    update.set(StrUtil.format("ingame_data.field_card_1.{}.card", index), fieldCard1.get(index));
                });
        IntStream.range(0, fieldCard2.size())
                .forEach(index -> {
                    update.set(StrUtil.format("ingame_data.field_card_2.{}.card", index), fieldCard2.get(index));
                });
        IntStream.range(0, fieldCard3.size())
                .forEach(index -> {
                    update.set(StrUtil.format("ingame_data.field_card_3.{}.card", index), fieldCard3.get(index));
                });
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame endTurn(String gameId, String playerId) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.turn")
                        .toValueOf(AccumulatorOperators.Sum.sumOf("ingame_data.turn").and(1))
                        .and()
                        .set("ingame_data.round")
                        .toValueOf(ArithmeticOperators.Floor
                                .floorValueOf(ArithmeticOperators.Divide.valueOf(AccumulatorOperators.Sum.sumOf("ingame_data.turn").and(1))
                                .divideBy(ArrayOperators.Size.lengthOfArray("ingame_data.player_ids"))))
                        .and()
                        .set("ingame_data.current_player")
                        .toValueOf(ArrayOperators.ArrayElemAt
                                .arrayOf("ingame_data.player_ids")
                                .elementAt(ArithmeticOperators.Mod
                                        .valueOf(AccumulatorOperators.Sum.sumOf("ingame_data.turn").and(1))
                                        .mod(ArrayOperators.Size.lengthOfArray("ingame_data.player_ids"))))
                        .and()
                        .set("ingame_data.next_player")
                        .toValueOf(ArrayOperators.ArrayElemAt
                                .arrayOf("ingame_data.player_ids")
                                .elementAt(ArithmeticOperators.Mod
                                        .valueOf(AccumulatorOperators.Sum.sumOf("ingame_data.turn").and(2))
                                        .mod(ArrayOperators.Size.lengthOfArray("ingame_data.player_ids")))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame fillFieldLevel1(String gameId, String playerId, String cardId) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.deck_card_1").elemMatch(Criteria.where("id").is(cardId))
                .and("ingame_data.field_card_1").elemMatch(Criteria.where("card").is(null)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.field_card_1").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.field_card_1")
                                .as("field_card")
                                .andApply(ConditionalOperators.Cond
                                        .when(ConditionalOperators.IfNull
                                                .ifNull("field_card.card").then(true))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("field_card")
                                                .mergeWith(new Document()
                                                        .append("card", ArrayOperators.ArrayElemAt
                                                                .arrayOf(ArrayOperators.Filter
                                                                        .filter("ingame_data.deck_card_1")
                                                                        .as("deck_card")
                                                                        .by(ComparisonOperators.Eq
                                                                                .valueOf("deck_card.id").equalToValue(cardId)))
                                                                .elementAt(0))))
                                        .otherwiseValueOf("field_card")))
                        .and()
                        .set("ingame_data.deck_card_1").toValueOf(ArrayOperators.Filter
                                .filter("ingame_data.deck_card_1")
                                .as("deck_card")
                                .by(ComparisonOperators.Ne.valueOf("deck_card.id").notEqualToValue(cardId))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);
        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame fillFieldLevel2(String gameId, String playerId, String cardId) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.deck_card_2").elemMatch(Criteria.where("id").is(cardId))
                .and("ingame_data.field_card_2").elemMatch(Criteria.where("card").is(null)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.field_card_2").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.field_card_2")
                                .as("field_card")
                                .andApply(ConditionalOperators.Cond
                                        .when(ConditionalOperators.IfNull
                                                .ifNull("field_card.card").then(true))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("field_card")
                                                .mergeWith(new Document()
                                                        .append("card", ArrayOperators.ArrayElemAt
                                                                .arrayOf(ArrayOperators.Filter
                                                                        .filter("ingame_data.deck_card_2")
                                                                        .as("deck_card")
                                                                        .by(ComparisonOperators.Eq
                                                                                .valueOf("deck_card.id").equalToValue(cardId)))
                                                                .elementAt(0))))
                                        .otherwiseValueOf("field_card")))
                        .and()
                        .set("ingame_data.deck_card_2").toValueOf(ArrayOperators.Filter
                                .filter("ingame_data.deck_card_2")
                                .as("deck_card")
                                .by(ComparisonOperators.Ne.valueOf("deck_card.id").notEqualToValue(cardId))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);
        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame fillFieldLevel3(String gameId, String playerId, String cardId) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.deck_card_3").elemMatch(Criteria.where("id").is(cardId))
                .and("ingame_data.field_card_3").elemMatch(Criteria.where("card").is(null)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.field_card_3").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.field_card_3")
                                .as("field_card")
                                .andApply(ConditionalOperators.Cond
                                        .when(ConditionalOperators.IfNull
                                                .ifNull("field_card.card").then(true))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("field_card")
                                                .mergeWith(new Document()
                                                        .append("card", ArrayOperators.ArrayElemAt
                                                                .arrayOf(ArrayOperators.Filter
                                                                        .filter("ingame_data.deck_card_3")
                                                                        .as("deck_card")
                                                                        .by(ComparisonOperators.Eq
                                                                                .valueOf("deck_card.id").equalToValue(cardId)))
                                                                .elementAt(0))))
                                        .otherwiseValueOf("field_card")))
                        .and()
                        .set("ingame_data.deck_card_3").toValueOf(ArrayOperators.Filter
                                .filter("ingame_data.deck_card_3")
                                .as("deck_card")
                                .by(ComparisonOperators.Ne.valueOf("deck_card.id").notEqualToValue(cardId))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);
        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame gatherGem(String gameId, String playerId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.onyx").gte(onyx)
                .and("ingame_data.ruby").gte(ruby)
                .and("ingame_data.emerald").gte(emerald)
                .and("ingame_data.sapphire").gte(sapphire)
                .and("ingame_data.diamond").gte(diamond)
                .and("ingame_data.players").elemMatch(Criteria.where("player_id").is(playerId)
                        .and("gold").gte(-gold)
                        .and("onyx").gte(-onyx)
                        .and("ruby").gte(-ruby)
                        .and("emerald").gte(-emerald)
                        .and("sapphire").gte(-sapphire)
                        .and("diamond").gte(-diamond)));
        Update update = new Update();
        update.inc("ingame_data.gold", -gold);
        update.inc("ingame_data.onyx", -onyx);
        update.inc("ingame_data.ruby", -ruby);
        update.inc("ingame_data.emerald", -emerald);
        update.inc("ingame_data.sapphire", -sapphire);
        update.inc("ingame_data.diamond", -diamond);
        update.inc("ingame_data.players.$[index].gold", gold);
        update.inc("ingame_data.players.$[index].onyx", onyx);
        update.inc("ingame_data.players.$[index].ruby", ruby);
        update.inc("ingame_data.players.$[index].emerald", emerald);
        update.inc("ingame_data.players.$[index].sapphire", sapphire);
        update.inc("ingame_data.players.$[index].diamond", diamond);
        update.filterArray(Criteria.where("index.player_id").is(playerId));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame buyCardInHand(String gameId, String playerId, String cardId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.players").elemMatch(Criteria.where("player_id").is(playerId)
                        .and("gold").gte(-gold)
                        .and("onyx").gte(-onyx)
                        .and("ruby").gte(-ruby)
                        .and("emerald").gte(-emerald)
                        .and("sapphire").gte(-sapphire)
                        .and("diamond").gte(-diamond)
                        .and("reserve_cards").elemMatch(Criteria.where("id").is(cardId))));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
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
                            .andApply(ConditionalOperators.Cond
                                            .when(ComparisonOperators.Eq.valueOf("player.player_id").equalToValue(playerId))
                                            .thenValueOf(ObjectOperators.MergeObjects
                                                    .mergeValuesOf("player")
                                                    .mergeWith(new Document()
                                                            .append("gold", ArithmeticOperators.Subtract.valueOf("$$player.gold").subtract(-gold))
                                                            .append("onyx", ArithmeticOperators.Subtract.valueOf("$$player.onyx").subtract(-onyx))
                                                            .append("ruby", ArithmeticOperators.Subtract.valueOf("$$player.ruby").subtract(-ruby))
                                                            .append("emerald", ArithmeticOperators.Subtract.valueOf("$$player.emerald").subtract(-emerald))
                                                            .append("sapphire", ArithmeticOperators.Subtract.valueOf("$$player.sapphire").subtract(-sapphire))
                                                            .append("diamond", ArithmeticOperators.Subtract.valueOf("$$player.diamond").subtract(-diamond))
                                                            .append("cards", ArrayOperators.ConcatArrays
                                                                    .arrayOf("$$player.cards")
                                                                    .concat(ArrayOperators.Filter
                                                                            .filter("$$player.reserve_cards")
                                                                            .as("reserve_card")
                                                                            .by(ComparisonOperators.Eq
                                                                                    .valueOf("reserve_card.id").equalToValue(cardId))))
                                                            .append("reserve_cards", ArrayOperators.Filter
                                                                    .filter("$$player.reserve_cards")
                                                                    .as("reserve_card")
                                                                    .by(ComparisonOperators.Ne
                                                                            .valueOf("reserve_card.id").notEqualToValue(cardId)))))
                                            .otherwiseValueOf("player"))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame buyCardFieldLevel1(String gameId, String playerId, String cardId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond) {
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
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
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
                                .andApply(ConditionalOperators.Cond
                                                .when(ComparisonOperators.Eq
                                                        .valueOf("player.player_id").equalToValue(playerId))
                                                .thenValueOf(ObjectOperators.MergeObjects
                                                        .mergeValuesOf("player")
                                                        .mergeWith(new Document()
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
                                                                                        .as("field_card")
                                                                                        .by(ComparisonOperators.Eq
                                                                                                .valueOf("field_card.card.id").equalToValue(cardId)))
                                                                                .as("field_card")
                                                                                .andApply(ObjectOperators.GetField.getField("card").of("field_card"))))))
                                                .otherwiseValueOf("player")))
                        .and()
                        .set("ingame_data.field_card_1").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.field_card_1")
                                .as("field_card")
                                .andApply(ConditionalOperators.Cond
                                                .when(ComparisonOperators.Eq.valueOf("field_card.card.id").equalToValue(cardId))
                                                .thenValueOf(ObjectOperators.MergeObjects
                                                        .mergeValuesOf("field_card")
                                                        .mergeWith(new Document()
                                                                .append("card", null)))
                                                .otherwiseValueOf("field_card"))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame buyCardFieldLevel2(String gameId, String playerId, String cardId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond) {
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
                .and("ingame_data.field_card_2").elemMatch(Criteria.where("card.id").is(cardId)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
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
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq
                                                .valueOf("player.player_id").equalToValue(playerId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("player")
                                                .mergeWith(new Document()
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
                                                                                .filter("ingame_data.field_card_2")
                                                                                .as("field_card")
                                                                                .by(ComparisonOperators.Eq
                                                                                        .valueOf("field_card.card.id").equalToValue(cardId)))
                                                                        .as("field_card")
                                                                        .andApply(ObjectOperators.GetField.getField("card").of("field_card"))))))
                                        .otherwiseValueOf("player")))
                        .and()
                        .set("ingame_data.field_card_2").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.field_card_2")
                                .as("field_card")
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq.valueOf("field_card.card.id").equalToValue(cardId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("field_card")
                                                .mergeWith(new Document()
                                                        .append("card", null)))
                                        .otherwiseValueOf("field_card"))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame buyCardFieldLevel3(String gameId, String playerId, String cardId, int gold, int onyx, int ruby, int emerald, int sapphire, int diamond) {
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
                .and("ingame_data.field_card_3").elemMatch(Criteria.where("card.id").is(cardId)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
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
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq
                                                .valueOf("player.player_id").equalToValue(playerId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("player")
                                                .mergeWith(new Document()
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
                                                                                .filter("ingame_data.field_card_3")
                                                                                .as("field_card")
                                                                                .by(ComparisonOperators.Eq
                                                                                        .valueOf("field_card.card.id").equalToValue(cardId)))
                                                                        .as("field_card")
                                                                        .andApply(ObjectOperators.GetField.getField("card").of("field_card"))))))
                                        .otherwiseValueOf("player")))
                        .and()
                        .set("ingame_data.field_card_3").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.field_card_3")
                                .as("field_card")
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq.valueOf("field_card.card.id").equalToValue(cardId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("field_card")
                                                .mergeWith(new Document()
                                                        .append("card", null)))
                                        .otherwiseValueOf("field_card"))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame reserveCardDeck1(String gameId, String playerId, String cardId, int gold) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.gold").gte(gold)
                .and("ingame_data.deck_card_1").elemMatch(Criteria.where("id").is(cardId)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.gold").toValueOf(ArithmeticOperators.Subtract.valueOf("ingame_data.gold").subtract(gold))
                        .and()
                        .set("ingame_data.players").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.players")
                                .as("player")
                                .andApply(ConditionalOperators.Cond
                                                .when(ComparisonOperators.Eq.valueOf("player.player_id").equalToValue(playerId))
                                                .thenValueOf(ObjectOperators.MergeObjects
                                                        .mergeValuesOf("player")
                                                        .mergeWith(new Document()
                                                                .append("gold", AccumulatorOperators.Sum.sumOf("$$player.gold").and(gold))
                                                                .append("reserve_cards", ArrayOperators.ConcatArrays
                                                                        .arrayOf("$$player.reserve_cards")
                                                                        .concat(ArrayOperators.Filter
                                                                                .filter("ingame_data.deck_card_1")
                                                                                .as("deck_card")
                                                                                .by(ComparisonOperators.Eq.valueOf("deck_card.id").equalToValue(cardId))))))
                                                .otherwiseValueOf("player")))
                        .and()
                        .set("ingame_data.deck_card_1").toValueOf(ArrayOperators.Filter
                                .filter("ingame_data.deck_card_1")
                                .as("deck_card")
                                .by(ComparisonOperators.Ne.valueOf("deck_card.id").notEqualToValue(cardId))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame reserveCardDeck2(String gameId, String playerId, String cardId, int gold) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.gold").gte(gold)
                .and("ingame_data.deck_card_2").elemMatch(Criteria.where("id").is(cardId)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.gold").toValueOf(ArithmeticOperators.Subtract.valueOf("ingame_data.gold").subtract(gold))
                        .and()
                        .set("ingame_data.players").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.players")
                                .as("player")
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq.valueOf("player.player_id").equalToValue(playerId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("player")
                                                .mergeWith(new Document()
                                                        .append("gold", AccumulatorOperators.Sum.sumOf("$$player.gold").and(gold))
                                                        .append("reserve_cards", ArrayOperators.ConcatArrays
                                                                .arrayOf("$$player.reserve_cards")
                                                                .concat(ArrayOperators.Filter
                                                                        .filter("ingame_data.deck_card_2")
                                                                        .as("deck_card")
                                                                        .by(ComparisonOperators.Eq.valueOf("deck_card.id").equalToValue(cardId))))))
                                        .otherwiseValueOf("player")))
                        .and()
                        .set("ingame_data.deck_card_2").toValueOf(ArrayOperators.Filter
                                .filter("ingame_data.deck_card_2")
                                .as("deck_card")
                                .by(ComparisonOperators.Ne.valueOf("deck_card.id").notEqualToValue(cardId))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame reserveCardDeck3(String gameId, String playerId, String cardId, int gold) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.gold").gte(gold)
                .and("ingame_data.deck_card_3").elemMatch(Criteria.where("id").is(cardId)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.gold").toValueOf(ArithmeticOperators.Subtract.valueOf("ingame_data.gold").subtract(gold))
                        .and()
                        .set("ingame_data.players").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.players")
                                .as("player")
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq.valueOf("player.player_id").equalToValue(playerId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("player")
                                                .mergeWith(new Document()
                                                        .append("gold", AccumulatorOperators.Sum.sumOf("$$player.gold").and(gold))
                                                        .append("reserve_cards", ArrayOperators.ConcatArrays
                                                                .arrayOf("$$player.reserve_cards")
                                                                .concat(ArrayOperators.Filter
                                                                        .filter("ingame_data.deck_card_3")
                                                                        .as("deck_card")
                                                                        .by(ComparisonOperators.Eq.valueOf("deck_card.id").equalToValue(cardId))))))
                                        .otherwiseValueOf("player")))
                        .and()
                        .set("ingame_data.deck_card_3").toValueOf(ArrayOperators.Filter
                                .filter("ingame_data.deck_card_3")
                                .as("deck_card")
                                .by(ComparisonOperators.Ne.valueOf("deck_card.id").notEqualToValue(cardId))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame reserveCardField1(String gameId, String playerId, String cardId, int gold) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.gold").gte(gold)
                .and("ingame_data.field_card_1").elemMatch(Criteria.where("card.id").is(cardId)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.gold").toValueOf(ArithmeticOperators.Subtract.valueOf("ingame_data.gold").subtract(gold))
                        .and()
                        .set("ingame_data.players").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.players")
                                .as("player")
                                .andApply(ConditionalOperators.Cond
                                                .when(ComparisonOperators.Eq.valueOf("player.player_id").equalToValue(playerId))
                                                .thenValueOf(ObjectOperators.MergeObjects
                                                        .mergeValuesOf("player")
                                                        .mergeWith(new Document()
                                                                .append("gold", AccumulatorOperators.Sum.sumOf("$$player.gold").and(gold))
                                                                .append("reserve_cards", ArrayOperators.ConcatArrays
                                                                        .arrayOf("$$player.reserve_cards")
                                                                        .concat(VariableOperators.Map
                                                                                .itemsOf(ArrayOperators.Filter
                                                                                        .filter("ingame_data.field_card_1")
                                                                                        .as("field_card")
                                                                                        .by(ComparisonOperators.Eq.valueOf("field_card.card.id").equalToValue(cardId)))
                                                                                .as("field_card")
                                                                                .andApply(ObjectOperators.GetField.getField("card").of("field_card"))))))
                                                .otherwiseValueOf("player")))
                        .and()
                        .set("ingame_data.field_card_1").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.field_card_1")
                                .as("field_card")
                                .andApply(ConditionalOperators.Cond
                                                .when(ComparisonOperators.Eq
                                                        .valueOf("field_card.card.id").equalToValue(cardId))
                                                .thenValueOf(ObjectOperators.MergeObjects
                                                        .mergeValuesOf("field_card")
                                                        .mergeWith(new Document()
                                                                .append("card", null)))
                                                .otherwiseValueOf("field_card"))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame reserveCardField2(String gameId, String playerId, String cardId, int gold) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.gold").gte(gold)
                .and("ingame_data.field_card_2").elemMatch(Criteria.where("card.id").is(cardId)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.gold").toValueOf(ArithmeticOperators.Subtract.valueOf("ingame_data.gold").subtract(gold))
                        .and()
                        .set("ingame_data.players").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.players")
                                .as("player")
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq.valueOf("player.player_id").equalToValue(playerId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("player")
                                                .mergeWith(new Document()
                                                        .append("gold", AccumulatorOperators.Sum.sumOf("$$player.gold").and(gold))
                                                        .append("reserve_cards", ArrayOperators.ConcatArrays
                                                                .arrayOf("$$player.reserve_cards")
                                                                .concat(VariableOperators.Map
                                                                        .itemsOf(ArrayOperators.Filter
                                                                                .filter("ingame_data.field_card_2")
                                                                                .as("field_card")
                                                                                .by(ComparisonOperators.Eq.valueOf("field_card.card.id").equalToValue(cardId)))
                                                                        .as("field_card")
                                                                        .andApply(ObjectOperators.GetField.getField("card").of("field_card"))))))
                                        .otherwiseValueOf("player")))
                        .and()
                        .set("ingame_data.field_card_2").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.field_card_2")
                                .as("field_card")
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq
                                                .valueOf("field_card.card.id").equalToValue(cardId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("field_card")
                                                .mergeWith(new Document()
                                                        .append("card", null)))
                                        .otherwiseValueOf("field_card"))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame reserveCardField3(String gameId, String playerId, String cardId, int gold) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId)
                .and("ingame_data.gold").gte(gold)
                .and("ingame_data.field_card_3").elemMatch(Criteria.where("card.id").is(cardId)));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.gold").toValueOf(ArithmeticOperators.Subtract.valueOf("ingame_data.gold").subtract(gold))
                        .and()
                        .set("ingame_data.players").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.players")
                                .as("player")
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq.valueOf("player.player_id").equalToValue(playerId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("player")
                                                .mergeWith(new Document()
                                                        .append("gold", AccumulatorOperators.Sum.sumOf("$$player.gold").and(gold))
                                                        .append("reserve_cards", ArrayOperators.ConcatArrays
                                                                .arrayOf("$$player.reserve_cards")
                                                                .concat(VariableOperators.Map
                                                                        .itemsOf(ArrayOperators.Filter
                                                                                .filter("ingame_data.field_card_3")
                                                                                .as("field_card")
                                                                                .by(ComparisonOperators.Eq.valueOf("field_card.card.id").equalToValue(cardId)))
                                                                        .as("field_card")
                                                                        .andApply(ObjectOperators.GetField.getField("card").of("field_card"))))))
                                        .otherwiseValueOf("player")))
                        .and()
                        .set("ingame_data.field_card_3").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.field_card_3")
                                .as("field_card")
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq
                                                .valueOf("field_card.card.id").equalToValue(cardId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("field_card")
                                                .mergeWith(new Document()
                                                        .append("card", null)))
                                        .otherwiseValueOf("field_card"))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

    @Override
    public SplendorGame takeNoble(String gameId, String playerId, String nobleId) {
        Query query = Query.query(Criteria.where("game_id").is(gameId)
                .and("status").is(GameConstants.STATUS_START)
                .and("ingame_data.current_player").is(playerId));
        UpdateDefinition update = AggregationUpdate.update()
                .set(SetOperation
                        .set("ingame_data.players").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.players")
                                .as("player")
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq.valueOf("player.player_id").equalToValue(playerId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("player")
                                                .mergeWith(new Document()
                                                        .append("nobles", ArrayOperators.ConcatArrays
                                                                .arrayOf("$$player.nobles")
                                                                .concat(VariableOperators.Map
                                                                        .itemsOf(ArrayOperators.Filter
                                                                                .filter("ingame_data.field_noble")
                                                                                .as("field_noble")
                                                                                .by(ComparisonOperators.Eq.valueOf("field_noble.noble.id").equalToValue(nobleId)))
                                                                        .as("field_noble")
                                                                        .andApply(ObjectOperators.GetField.getField("noble").of("field_noble"))))))
                                        .otherwiseValueOf("player")))
                        .and()
                        .set("ingame_data.field_noble").toValueOf(VariableOperators.Map
                                .itemsOf("ingame_data.field_noble")
                                .as("field_noble")
                                .andApply(ConditionalOperators.Cond
                                        .when(ComparisonOperators.Eq
                                                .valueOf("field_noble.noble.id").equalToValue(nobleId))
                                        .thenValueOf(ObjectOperators.MergeObjects
                                                .mergeValuesOf("field_noble")
                                                .mergeWith(new Document()
                                                        .append("noble", null)))
                                        .otherwiseValueOf("field_noble"))));
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options()
                .returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorGame.class);
    }

}
