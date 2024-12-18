package com.brettspiel.config.kafka;

import com.fasterxml.jackson.databind.JsonNode;
import io.confluent.kafka.serializers.json.KafkaJsonSchemaDeserializerConfig;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.config.SaslConfigs;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 12/20/2023 - 4:19 PM
 */
@Slf4j
@Configuration
public class KafkaConsumerConfig {

    @Value(value = "${spring.kafka.bootstrap-servers:#{null}}")
    private String boostrapServer;

    @Value(value = "${spring.kafka.consumer.groupId:#{null}}")
    private String groupId;

    @Value(value = "${spring.kafka.sasl.mechanism:#{null}}")
    private String saslMechanism;

    @Value(value = "${spring.kafka.sasl.jaas.config.username:#{null}}")
    private String saslJaasCfgUser;

    @Value(value = "${spring.kafka.sasl.jaas.config.password:#{null}}")
    private String saslJaasCfgPass;

    @Value(value = "${spring.kafka.sasl.security.protocol:#{null}}")
    private String securityProtocol;

    @Value(value = "${spring.kafka.consumer.auto-offset-reset:#{null}}")
    private String autoOffsetReset;

    @Value(value = "${spring.kafka.consumer.max-poll-interval-ms:#{null}}")
    private String maxPollIntervalMs;

    @Value(value = "${spring.kafka.consumer.session-timeout-ms:45000}")
    private String sessionTimeoutMs;

    @Value(value = "${spring.kafka.consumer.heartbeat-interval-ms:3000}")
    private String heartbeatIntervalMs;

    @Value(value = "${spring.kafka.schema-registry:#{null}}")
    private String schemaRegistry;



    @Bean
    @ConditionalOnExpression("!T(org.springframework.util.StringUtils).isEmpty('${spring.kafka.bootstrap-servers:}')")
    public ConsumerFactory<String, JsonNode> consumerFactory() {
        String authen = "org.apache.kafka.common.security.plain.PlainLoginModule required username=\"" + saslJaasCfgUser + "\" password=\"" + saslJaasCfgPass + "\";";

        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, boostrapServer);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        props.put(JsonDeserializer.TRUSTED_PACKAGES, "*");
        props.put(JsonDeserializer.VALUE_DEFAULT_TYPE, JsonNode.class);
        props.put(ConsumerConfig.ALLOW_AUTO_CREATE_TOPICS_CONFIG, true);
        //Kafka security config
        if (Strings.isNotBlank(saslMechanism) && Strings.isNotBlank(securityProtocol)) {
            props.put(SaslConfigs.SASL_MECHANISM, saslMechanism);
            props.put(SaslConfigs.SASL_JAAS_CONFIG, authen);
            props.put(AdminClientConfig.SECURITY_PROTOCOL_CONFIG, securityProtocol);
        }
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, autoOffsetReset);
        props.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, maxPollIntervalMs);
        props.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG, sessionTimeoutMs);
        props.put(ConsumerConfig.HEARTBEAT_INTERVAL_MS_CONFIG, heartbeatIntervalMs);

        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        props.put(ErrorHandlingDeserializer.KEY_DESERIALIZER_CLASS, StringDeserializer.class);
        props.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS, JsonDeserializer.class);
//        props.put(KafkaJsonSchemaDeserializerConfig.SCHEMA_REGISTRY_URL_CONFIG, schemaRegistry);
        props.put(KafkaJsonSchemaDeserializerConfig.AUTO_REGISTER_SCHEMAS, false);
        props.put(KafkaJsonSchemaDeserializerConfig.JSON_VALUE_TYPE, JsonNode.class.getName());
        props.put(KafkaJsonSchemaDeserializerConfig.FAIL_INVALID_SCHEMA, true);
        props.put(KafkaJsonSchemaDeserializerConfig.FAIL_UNKNOWN_PROPERTIES, false);

        return new DefaultKafkaConsumerFactory<>(props);
    }

    @Bean
    @ConditionalOnBean(ConsumerFactory.class)
    public ConcurrentKafkaListenerContainerFactory<String, JsonNode> kafkaListenerContainerFactory(ConsumerFactory<String, JsonNode> consumerFactory) {
        ConcurrentKafkaListenerContainerFactory<String, JsonNode> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        return factory;
    }


//    @DltHandler
//    public void handleDlt(String message, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
//        log.info("KafkaConsumer - Message: {} handled by dlq topic: {}", message, topic);
//    }

}
