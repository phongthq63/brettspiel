package com.brettspiel.utils;

import com.fasterxml.jackson.databind.*;
import lombok.SneakyThrows;

/**
 * Created by Quach Thanh Phong
 * On 4/21/2023 - 1:48 PM
 */
public class JsonUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    static {
        objectMapper.findAndRegisterModules();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, true);
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
    }


    @SneakyThrows
    public static JsonNode toJsonNode(String json) {
        return objectMapper.readTree(json);
    }

    @SneakyThrows
    public static String toJson(Object object) {
        return objectMapper.writeValueAsString(object);
    }

    @SneakyThrows
    public static <T> T toBean(String json, Class<T> beanClass) {
        return objectMapper.readValue(json, beanClass);
    }

}
