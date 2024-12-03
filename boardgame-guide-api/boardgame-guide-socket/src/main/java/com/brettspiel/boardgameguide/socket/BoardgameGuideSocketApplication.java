package com.brettspiel.boardgameguide.socket;

import cn.hutool.extra.spring.EnableSpringUtil;
import com.corundumstudio.socketio.ClientOperations;
import com.corundumstudio.socketio.SocketIOServer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

/**
 * Created by Quach Thanh Phong
 * On 11/10/2024 - 12:31 PM
 */
@Slf4j
@SpringBootApplication(scanBasePackages = "com.brettspiel")
@EnableSpringUtil
public class BoardgameGuideSocketApplication {

    public static void main(String[] args) {
        ApplicationContext applicationContext = SpringApplication.run(BoardgameGuideSocketApplication.class, args);

        //Add shutdown hook
        Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
            private final SocketIOServer socketIOServer = applicationContext.getBean(SocketIOServer.class);

            @Override
            public void run() {
                log.info("ShutdownHook - Start - {}", socketIOServer);
                socketIOServer.getAllClients().forEach(ClientOperations::disconnect);
                log.info("ShutdownHook - End");
            }
        }));
    }

}
