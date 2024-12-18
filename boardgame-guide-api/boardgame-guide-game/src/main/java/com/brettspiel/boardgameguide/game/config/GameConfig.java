package com.brettspiel.boardgameguide.game.config;

import cn.hutool.json.JSONUtil;
import com.brettspiel.boardgameguide.game.vo.Game;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/17/2024 - 4:24 PM
 */
@Configuration
public class GameConfig {

    @Autowired
    private ResourceLoader resourceLoader;


    public List<Game> games;


    @PostConstruct
    public void init() throws IOException {
        games = JSONUtil.toList(StreamUtils.copyToString(resourceLoader.getResource("classpath:config/GameConfig.json").getInputStream(), StandardCharsets.UTF_8), Game.class);
    }
}
