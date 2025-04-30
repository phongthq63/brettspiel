package com.brettspiel.boardgameguide.game.repository.impl;

import com.brettspiel.boardgameguide.game.entity.Game;
import com.brettspiel.boardgameguide.game.repository.custom.ICustomGameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 7:12 PM
 */
@Repository
@RequiredArgsConstructor
public class IGameRepositoryImpl implements ICustomGameRepository {

    private final MongoTemplate mongoTemplate;


    @Override
    public List<Game> findList(String keyword, List<Integer[]> players, List<Integer[]> playTimes, Set<String> genreIds, String sortBy, Integer page, Integer size) {
        Criteria criteria = new Criteria();
        if (players != null && !players.isEmpty()) {
            List<Criteria> orCriteria = new ArrayList<>();
            for (Integer[] player: players) {
                if (player[0] == null) {
                    orCriteria.add(Criteria.where("max_players").lte(player[1]));
                } else if (player[1] == null) {
                    orCriteria.add(Criteria.where("min_players").gte(player[0]));
                } else {
                    orCriteria.add(Criteria.where("min_players").gte(player[0]).and("max_players").lte(player[1]));
                }
            }
            criteria.andOperator(new Criteria().orOperator(orCriteria));
        }
        if (playTimes != null && !playTimes.isEmpty()) {
            List<Criteria> orCriteria = new ArrayList<>();
            for (Integer[] playTime: playTimes) {
                if (playTime[0] == null) {
                    orCriteria.add(Criteria.where("max_play_time").lte(playTime[1]));
                } else if (playTime[1] == null) {
                    orCriteria.add(Criteria.where("min_play_time").gte(playTime[0]));
                } else {
                    orCriteria.add(Criteria.where("min_play_time").gte(playTime[0]).and("max_play_time").lte(playTime[1]));
                }
            }
            criteria.andOperator(new Criteria().orOperator(orCriteria));
        }
        if (genreIds != null && !genreIds.isEmpty()) {
            List<Criteria> orCriteria = new ArrayList<>();
            for (String genreId : genreIds) {
                orCriteria.add(Criteria.where("genres.genre_id").is(genreId));
            }
            criteria.andOperator(new Criteria().orOperator(orCriteria));
        }

        Query query;
        if (keyword == null || keyword.isEmpty()) {
            query = Query.query(criteria);
        } else {
            query = TextQuery.queryText(TextCriteria.forDefaultLanguage().matching(keyword))
                    .addCriteria(criteria);
        }
        query.skip((long) page * size);
        query.limit(size);
        if (sortBy != null && !sortBy.isEmpty()) {
            query.with(Sort.by(Sort.Direction.DESC, sortBy));
        }

        return mongoTemplate.find(query, Game.class);
    }

    @Override
    public Game findById(String id) {
        Query query = Query.query(Criteria.where("game_id").is(id));

        return mongoTemplate.findOne(query, Game.class);
    }

    @Override
    public long count(String keyword, List<Integer[]> players, List<Integer[]> playTimes, Set<String> genreIds) {
        Criteria criteria = new Criteria();
        if (players != null && !players.isEmpty()) {
            List<Criteria> orCriteria = new ArrayList<>();
            for (Integer[] player: players) {
                if (player[0] == null) {
                    orCriteria.add(Criteria.where("max_players").lte(player[1]));
                } else if (player[1] == null) {
                    orCriteria.add(Criteria.where("min_players").gte(player[0]));
                } else {
                    orCriteria.add(Criteria.where("min_players").gte(player[0]).and("max_players").lte(player[1]));
                }
            }
            criteria.andOperator(new Criteria().orOperator(orCriteria));
        }
        if (playTimes != null && !playTimes.isEmpty()) {
            List<Criteria> orCriteria = new ArrayList<>();
            for (Integer[] playTime: playTimes) {
                if (playTime[0] == null) {
                    orCriteria.add(Criteria.where("max_play_time").lte(playTime[1]));
                } else if (playTime[1] == null) {
                    orCriteria.add(Criteria.where("min_play_time").gte(playTime[0]));
                } else {
                    orCriteria.add(Criteria.where("min_play_time").gte(playTime[0]).and("max_play_time").lte(playTime[1]));
                }
            }
            criteria.andOperator(new Criteria().orOperator(orCriteria));
        }
        if (genreIds != null && !genreIds.isEmpty()) {
            List<Criteria> orCriteria = new ArrayList<>();
            for (String genreId : genreIds) {
                orCriteria.add(Criteria.where("genres.genre_id").is(genreId));
            }
            criteria.andOperator(new Criteria().orOperator(orCriteria));
        }

        Query query;
        if (keyword == null || keyword.isEmpty()) {
            query = Query.query(criteria);
        } else {
            query = TextQuery.queryText(TextCriteria.forDefaultLanguage().matching(keyword))
                    .addCriteria(criteria);
        }
        return mongoTemplate.count(query, Game.class);
    }
}
