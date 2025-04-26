package com.brettspiel.boardgameguide.game.config.mongodb;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ReadPreference;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.SessionSynchronization;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.core.convert.*;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * Created by Quach Thanh Phong
 * On 12/16/2023 - 8:03 PM
 */
@Configuration
@EnableMongoAuditing
@EnableMongoRepositories(basePackages = {"com.brettspiel.boardgameguide.game.repository"})
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Value("${spring.data.mongodb.database}")
    private String mongoDatabaseName;



    @NotNull
    @Override
    protected String getDatabaseName() {
        return mongoDatabaseName;
    }

    @NotNull
    @Bean
    public MongoClient mongoClient() {
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(mongoUri))
                .readPreference(ReadPreference.secondaryPreferred())
                .addCommandListener(new CustomCommandListener())
                .applyToConnectionPoolSettings(builder -> builder
                        .minSize(10)
                        .maxConnecting(100))
                .build();
        return MongoClients.create(settings);
    }

    @Primary
    @Bean
    public MongoDatabaseFactory mongoDatabaseFactory(MongoClient mongoClient) {
        return new SimpleMongoClientDatabaseFactory(mongoClient, mongoDatabaseName);
    }

    @NotNull
    @Primary
    @Bean
    public MappingMongoConverter mappingMongoConverter(@NotNull MongoDatabaseFactory databaseFactory,
                                                       @NotNull MongoCustomConversions customConversions,
                                                       @NotNull MongoMappingContext mappingContext) {
        DbRefResolver dbRefResolver = new DefaultDbRefResolver(databaseFactory);
        MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, mappingContext);
        converter.setCustomConversions(customConversions);
        converter.setCodecRegistryProvider(databaseFactory);
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));
        return converter;
    }

    @Bean
    public MongoTransactionManager mongoTransactionManager(MongoDatabaseFactory mongoDatabaseFactory) {
        return new MongoTransactionManager(mongoDatabaseFactory);
    }

    @NotNull
    @Bean
    public MongoTemplate mongoTemplate(@NotNull MongoDatabaseFactory mongoDatabaseFactory,
                                       @NotNull MappingMongoConverter mappingMongoConverter){
        MongoTemplate mongoTemplate = new CustomMongoTemplate(mongoDatabaseFactory, mappingMongoConverter);
        mongoTemplate.setSessionSynchronization(SessionSynchronization.ALWAYS);
        mongoTemplate.setReadPreference(ReadPreference.secondaryPreferred());
        return mongoTemplate;
    }

}
