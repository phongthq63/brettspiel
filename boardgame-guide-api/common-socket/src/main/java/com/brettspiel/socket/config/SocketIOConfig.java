package com.brettspiel.socket.config;

import com.corundumstudio.socketio.AuthorizationListener;
import com.corundumstudio.socketio.SocketConfig;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.Transport;
import com.corundumstudio.socketio.annotation.SpringAnnotationScanner;
import com.corundumstudio.socketio.listener.ExceptionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Quách Thanh Phong
 * On 7/3/2023 - 12:26 AM
 */
@Configuration
public class SocketIOConfig {

    @Value("${socket-io.context:/socket.io}")
    private String context;

    @Value("${socket-io.port:8699}")
    private Integer port;

    @Value("${socket-io.max-frame-payload-length:1048576}")
    private int maxFramePayloadLength;

    @Value("${socket-io.max-http-content-length:1048576}")
    private int maxHttpContentLength;

    @Value("${socket-io.boss-count:1}")
    private int bossCount;

    @Value("${socket-io.work-count:100}")
    private int workCount;

    @Value("${socket-io.allow-custom-requests:true}")
    private boolean allowCustomRequests;

    @Value("${socket-io.upgrade-timeout:10000}")
    private int upgradeTimeout;

    @Value("${socket-io.ping-timeout:30000}")
    private int pingTimeout;

    @Value("${socket-io.ping-interval:10000}")
    private int pingInterval;

    @Autowired(required = false)
    private ExceptionListener exceptionListener;

    @Autowired(required = false)
    private AuthorizationListener authorizationListener;



    @Bean
    @ConditionalOnExpression("!T(org.springframework.util.StringUtils).isEmpty('${socket-io.port:}')")
    public SocketIOServer socketIOServer() {
        SocketConfig socketConfig = new SocketConfig();
        socketConfig.setTcpNoDelay(true);
        socketConfig.setSoLinger(0);
//        socketConfig.setReuseAddress(false);

        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setOrigin("*");
        config.setPort(port);
        config.setTransports(Transport.WEBSOCKET, Transport.POLLING);
        config.setContext(context);
        config.setBossThreads(bossCount);
        config.setWorkerThreads(workCount);
//        config.setUseLinuxNativeEpoll(true);
        config.setAllowCustomRequests(allowCustomRequests);
        config.setUpgradeTimeout(upgradeTimeout);
        config.setPingTimeout(pingTimeout);
        config.setPingInterval(pingInterval);
        config.setMaxHttpContentLength(maxHttpContentLength);
        config.setMaxFramePayloadLength(maxFramePayloadLength);
//        config.setStoreFactory(new RedissonStoreFactory(redissonClient));
        if (exceptionListener != null) {
            config.setExceptionListener(exceptionListener);
        }
        if (authorizationListener != null) {
            config.setAuthorizationListener(authorizationListener);
        }
        config.setAddVersionHeader(true);
        config.setHttpCompression(true);
        config.setWebsocketCompression(true);
        config.setSocketConfig(socketConfig);

        return new SocketIOServer(config);
    }

    @Bean
    @ConditionalOnBean(SocketIOServer.class)
    public SpringAnnotationScanner springAnnotationScanner(SocketIOServer socketIOServer) {
        return new SpringAnnotationScanner(socketIOServer);
    }

}
