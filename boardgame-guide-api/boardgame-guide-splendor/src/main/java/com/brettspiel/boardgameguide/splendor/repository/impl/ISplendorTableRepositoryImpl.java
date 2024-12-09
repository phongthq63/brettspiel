package com.brettspiel.boardgameguide.splendor.repository.impl;

import com.brettspiel.boardgameguide.splendor.constant.TableConstants;
import com.brettspiel.boardgameguide.splendor.entity.SplendorTable;
import com.brettspiel.boardgameguide.splendor.repository.custom.ICustomSplendorTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/17/2024 - 5:47 PM
 */
@Repository
@RequiredArgsConstructor
public class ISplendorTableRepositoryImpl implements ICustomSplendorTableRepository {

    private final MongoTemplate mongoTemplate;


    @Override
    public SplendorTable getById(String tableId) {
        Query query = Query.query(Criteria.where("table_id").is(tableId));

        return mongoTemplate.findOne(query, SplendorTable.class);
    }

    @Override
    public SplendorTable getByIdAndHost(String tableId, String hostId) {
        Query query = Query.query(Criteria.where("table_id").is(tableId)
                .and("host_id").is(hostId));

        return mongoTemplate.findOne(query, SplendorTable.class);
    }

    @Override
    public List<SplendorTable> getList(Integer page, Integer size) {
        Query query = new Query();
        query.skip((long) (page - 1) * size);
        query.limit(size);

        return mongoTemplate.find(query, SplendorTable.class);
    }

    @Override
    public SplendorTable initGame(String tableId) {
        Query query = Query.query(Criteria.where("table_id").is(tableId)
                .and("status").ne(TableConstants.STATUS_INGAME));
        Update update = new Update();
        update.set("status", TableConstants.STATUS_INGAME);
        FindAndModifyOptions findAndModifyOptions = FindAndModifyOptions.options().returnNew(true);

        return mongoTemplate.findAndModify(query, update, findAndModifyOptions, SplendorTable.class);
    }

}
