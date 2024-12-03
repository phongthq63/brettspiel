package com.brettspiel.config.kafka;

import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.config.SaslConfigs;
import org.apache.kafka.common.serialization.StringSerializer;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 12/20/2023 - 5:14 PM
 */
@EnableKafka
@Configuration
public class KafkaProducerConfig {

    @Value("${spring.kafka.producer.enable:#{false}}")
    private boolean enable;

    @Value("${spring.kafka.bootstrap-servers:#{null}}")
    private String bootstrapServer;

    @Value("${spring.kafka.producer.client-id:#{null}}")
    private String producerClientId;

    @Value("${spring.kafka.producer.retry:#{null}}")
    private String producerRetry;

    @Value("${spring.kafka.producer.batch-size:#{50}}")
    private Integer batchSize;

    @Value("${spring.kafka.producer.linger:#{0}}")
    private Integer linger;

    @Value("${spring.kafka.sasl.jaas.config.username:#{null}}")
    private String username;

    @Value("${spring.kafka.sasl.jaas.config.password:#{null}}")
    private String password;

    @Value("${spring.kafka.sasl.mechanism:#{null}}")
    private String saslMechanism;

    @Value("${spring.kafka.sasl.security.protocol:#{null}}")
    private String securityProtocol;

    @Value(value = "${spring.kafka.schema-registry:#{null}}")
    private String schemaRegistry;



    @Bean
    public KafkaAdmin kafkaAdmin() {
        return null;
    }


    @Bean
    @ConditionalOnExpression("!T(org.springframework.util.StringUtils).isEmpty('${spring.kafka.bootstrap-servers:}')")
    public ProducerFactory<String, Object> producerFactory() {
        String authen = "org.apache.kafka.common.security.plain.PlainLoginModule required username=\"" + username + "\" password=\"" + password + "\";";

        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServer);
        configProps.put(ProducerConfig.CLIENT_ID_CONFIG, producerClientId);
        configProps.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
        configProps.put(ProducerConfig.ACKS_CONFIG, "all");
        configProps.put(ProducerConfig.RETRIES_CONFIG, producerRetry);
        configProps.put(ProducerConfig.DELIVERY_TIMEOUT_MS_CONFIG, 120000);
        configProps.put(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, 3);
        configProps.put(ProducerConfig.BATCH_SIZE_CONFIG, batchSize);
        configProps.put(ProducerConfig.LINGER_MS_CONFIG, linger);
        //Kafka security config
        if (Strings.isNotBlank(saslMechanism) && Strings.isNotBlank(securityProtocol)) {
            configProps.put(SaslConfigs.SASL_MECHANISM, saslMechanism);
            configProps.put(SaslConfigs.SASL_JAAS_CONFIG, authen);
            configProps.put(AdminClientConfig.SECURITY_PROTOCOL_CONFIG, securityProtocol);
        }
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
//        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, KafkaJsonSchemaSerializer.class);
//        configProps.put(KafkaJsonSchemaSerializerConfig.SCHEMA_REGISTRY_URL_CONFIG, schemaRegistry);
//        configProps.put(KafkaJsonSchemaSerializerConfig.AUTO_REGISTER_SCHEMAS, true);

        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    @ConditionalOnBean(ProducerFactory.class)
    public KafkaTemplate<String, Object> kafkaTemplate(ProducerFactory<String, Object> producerFactory) {
        KafkaTemplate<String, Object> kafkaTemplate = new KafkaTemplate<>(producerFactory);
        return kafkaTemplate;
    }

}
