package com.brettspiel.config;

import feign.Logger;
import feign.codec.Decoder;
import feign.codec.ErrorDecoder;
import feign.jackson.JacksonDecoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Created by Quach Thanh Phong
 * On 4/20/2023 - 5:20 PM
 */
@EnableFeignClients(basePackages = "com.brettspiel", basePackageClasses = FeignConfig.class)
@Slf4j
@Component
public class FeignConfig {

    @Bean
    public ErrorDecoder errorDecoder() {
        return (s, response) -> {
            try {
                log.error("FeignConfig - errorDecoder - {} {} | {} {}", s, response.reason(), response.status(), new String(response.body().asInputStream().readAllBytes()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return new Exception(s);
        };
    }

    @Bean
    public Decoder feignDecoder() {
        return new JacksonDecoder();
    }

    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }

}
