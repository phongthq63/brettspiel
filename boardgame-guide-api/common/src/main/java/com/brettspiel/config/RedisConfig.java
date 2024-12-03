package com.brettspiel.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.redisson.connection.balancer.RoundRobinLoadBalancer;
import org.redisson.spring.data.connection.RedissonConnectionFactory;
import org.redisson.spring.transaction.RedissonTransactionManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 12/16/2023 - 8:51 PM
 */
@Configuration
public class RedisConfig {

    public final static String ModeSingle = "single";
    public final static String ModeCluster = "cluster";

    @Value("${spring.data.redis.mode:#{'single'}}")
    private String mode;

    @Value("${spring.data.redis.cluster.nodes:}")
    private List<String> nodes;

    @Value("${spring.data.redis.host:#{'localhost'}}")
    private String host;

    @Value("${spring.data.redis.port:#{6379}}")
    private String port;

    @Value("${spring.data.redis.database:#{0}}")
    private Integer database;

    @Value("${spring.data.redis.username:default}")
    private String username;

    @Value("${spring.data.redis.password:#{null}}")
    private String password;

    @Value("${spring.data.redis.prefix:#{''}}")
    private String prefix;


    @Bean
    @ConditionalOnExpression("!T(org.springframework.util.StringUtils).isEmpty('${spring.data.redis.host:}') || !T(org.springframework.util.CollectionUtils).isEmpty('${spring.data.redis.cluster.nodes:}')")
    public RedissonClient redissonClient() {
        Config redissonConfig = new Config();
        redissonConfig.setUseScriptCache(true);
        switch (mode) {
            case ModeCluster:
                redissonConfig.useClusterServers()
                        .setUsername(username)
                        .setPassword(password)
                        .addNodeAddress(nodes.stream().map(address -> "redis://" + address).toArray(String[]::new))
                        .setLoadBalancer(new RoundRobinLoadBalancer());
                break;

            default:
                redissonConfig.useSingleServer()
                        .setDatabase(database)
                        .setUsername(username)
                        .setPassword(password)
                        .setAddress("redis://" + host + ":" + port);
                break;
        }

        return Redisson.create(redissonConfig);
    }

    @Bean
    @ConditionalOnBean(RedissonClient.class)
    public RedissonConnectionFactory redissonConnectionFactory(RedissonClient redissonClient) {
        RedissonConnectionFactory redissonConnectionFactory = new RedissonConnectionFactory(redissonClient);
        return redissonConnectionFactory;
    }

    @Bean
    @ConditionalOnBean(RedissonClient.class)
    public RedissonTransactionManager redissonTransactionManager(RedissonClient redissonClient) {
        return new RedissonTransactionManager(redissonClient);
    }

    @Bean
    @ConditionalOnBean(RedisConnectionFactory.class)
    @SuppressWarnings("all")
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {

        // For the convenience of our own development, we generally use <String, Object> directly
        RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
        template.setConnectionFactory(factory);
        template.setEnableTransactionSupport(true);

        // Json serialization configuration
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        om.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        om.findAndRegisterModules();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(om, Object.class);

        // Serialization of String
        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
        // The key adopts the serialization method of String
        template.setKeySerializer(stringRedisSerializer);
        // The key of hash also adopts the serialization method of String
        template.setHashKeySerializer(stringRedisSerializer);
        // The value serialization method adopts jackson
        template.setValueSerializer(jackson2JsonRedisSerializer);
        // The value serialization method of hash adopts jackson
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        template.afterPropertiesSet();

        return template;
    }

}
