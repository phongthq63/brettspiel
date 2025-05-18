package com.brettspiel.boardgameguide.gateway.config.mongodb;

import com.mongodb.client.MongoClient;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.CollectionPreparer;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.query.UpdateDefinition;

/**
 * Created by Quach Thanh Phong
 * On 1/22/2024 - 9:16 PM
 */
public class CustomMongoTemplate extends MongoTemplate {

    public CustomMongoTemplate(MongoClient mongoClient, String databaseName) {
        super(mongoClient, databaseName);
    }

    public CustomMongoTemplate(MongoDatabaseFactory mongoDbFactory) {
        super(mongoDbFactory);
    }

    public CustomMongoTemplate(MongoDatabaseFactory mongoDbFactory, MongoConverter mongoConverter) {
        super(mongoDbFactory, mongoConverter);
    }

    @NotNull
    @Override
    protected UpdateResult doUpdate(@NotNull String collectionName,
                                    @NotNull Query query,
                                    @NotNull UpdateDefinition update, Class<?> entityClass,
                                    boolean upsert,
                                    boolean multi) {
        if (update instanceof Update customUpdate) {
            long now = System.currentTimeMillis();
            customUpdate.setOnInsert("created_time", now);
            customUpdate.set("updated_time", now);
            return super.doUpdate(collectionName, query, customUpdate, entityClass, upsert, multi);
        }

        return super.doUpdate(collectionName, query, update, entityClass, upsert, multi);
    }

    @NotNull
    @Override
    protected <T> T doFindAndModify(@NotNull CollectionPreparer collectionPreparer,
                                    @NotNull String collectionName,
                                    @NotNull Document query,
                                    Document fields,
                                    Document sort,
                                    @NotNull Class<T> entityClass,
                                    @NotNull UpdateDefinition update, FindAndModifyOptions options) {
        if (update instanceof Update customUpdate) {
            long now = System.currentTimeMillis();
            customUpdate.setOnInsert("created_time", now);
            customUpdate.set("updated_time", now);
            return super.doFindAndModify(collectionPreparer, collectionName, query, fields, sort, entityClass, customUpdate, options);
        }

        return super.doFindAndModify(collectionPreparer, collectionName, query, fields, sort, entityClass, update, options);
    }
}
