package com.brettspiel.config;

import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.retry.support.RetryTemplate;

import java.time.Duration;

/**
 * Created by Quach Thanh Phong
 * On 3/12/2024 - 1:39 PM
 */
@Configuration
public class RabbitMQConfig {

    @Value("${spring.rabbitmq.addresses:#{null}}")
    private String addresses;

    @Value("${spring.rabbitmq.virtual-host:#{'/'}}")
    private String virtualHost;

    @Value("${spring.rabbitmq.host:#{'localhost'}}")
    private String host;

    @Value("${spring.rabbitmq.port:#{5672}}")
    private Integer port;

    @Value("${spring.rabbitmq.username:#{'guest'}}")
    private String username;

    @Value("${spring.rabbitmq.password:#{'guest'}}")
    private String password;


    @Bean
    @ConditionalOnExpression("!T(org.springframework.util.StringUtils).isEmpty('${spring.rabbitmq.addresses:}') || " +
            "!T(org.springframework.util.StringUtils).isEmpty('${spring.rabbitmq.host:}')")
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory cachingConnectionFactory = new CachingConnectionFactory();
        if (addresses != null) {
            cachingConnectionFactory.setUri(addresses);
        } else {
            cachingConnectionFactory.setVirtualHost(virtualHost);
            cachingConnectionFactory.setHost(host);
            cachingConnectionFactory.setPort(port);
            cachingConnectionFactory.setUsername(username);
            cachingConnectionFactory.setPassword(password);
        }

        return cachingConnectionFactory;
    }

    @Bean
    @ConditionalOnBean(ConnectionFactory.class)
    public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    @ConditionalOnBean(ConnectionFactory.class)
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setRetryTemplate(RetryTemplate.builder()
                .exponentialBackoff(Duration.ofSeconds(60), 2, Duration.ofSeconds(999999))
                .maxAttempts(5)
                .build());
        rabbitTemplate.setMessageConverter(messageConverter);
        return rabbitTemplate;
    }

}
