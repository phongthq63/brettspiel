package com.brettspiel.boardgameguide.socket.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import jakarta.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 12/16/2023 - 7:45 PM
 */
@Configuration
public class SwaggerConfig {

    @Value("${springdoc.path-provider:#{''}}")
    private String pathProvider;

    @Bean
    public OpenAPI openAPI(ServletContext servletContext) {
        Server server = new Server().url(servletContext.getContextPath() + pathProvider);
        return new OpenAPI()
                .servers(List.of(server))
                .info(new Info()
                        .title("Boardgame guide Socket API")
                        .description("Boardgame guide Socket API Mockup 2024-December" +
                                "</br> Các tham số header truyền lên trong mọi request</br>" +
                                "<ul><li><b>Authorization</b>: (<span style=\"color: red;\">Require</span>) JWT lấy được sau khi login gửi lên sẽ theo định dạng Bearer <TOKEN>. Để test được trên swagger mọi người sẽ TOKEN bằng cách click vào button Authoize</li>" +
                                "<li><b>Accept-Language</b>: Ngôn ngữ ứng dụng: default lấy theo ngôn ngữ máy</li>" +
                                "</ul>")
                        .version("1.0.0")
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://springdoc.org")))
                .components(new Components()
                        .addSecuritySchemes("JWT Token", new SecurityScheme()
                                .name("JWT")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .in(SecurityScheme.In.HEADER))
                        .addSecuritySchemes("Basic Token", new SecurityScheme()
                                .name("Basic Auth")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("basic")
                                .in(SecurityScheme.In.HEADER)))
                .addSecurityItem(new SecurityRequirement()
                        .addList("JWT Token")
                        .addList("Basic Token"));
    }

}
