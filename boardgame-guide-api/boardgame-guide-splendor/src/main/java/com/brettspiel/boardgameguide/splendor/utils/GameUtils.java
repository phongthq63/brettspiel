package com.brettspiel.boardgameguide.splendor.utils;

import cn.hutool.json.JSONUtil;
import com.brettspiel.boardgameguide.splendor.vo.config.SplendorConfig;
import com.brettspiel.boardgameguide.splendor.vo.config.SplendorGameConfig;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 11/21/2024 - 11:11 AM
 */
@Component
public class GameUtils {

    private SplendorConfig splendorConfig;


    @Autowired
    private ResourceLoader resourceLoader;



    @PostConstruct
    public void init() throws IOException {
        splendorConfig = JSONUtil.toBean(StreamUtils.copyToString(resourceLoader.getResource("classpath:config/SplendorConfig.json").getInputStream(), StandardCharsets.UTF_8), SplendorConfig.class);
    }



    public List<Integer> getNumberPlayerAvailable() {
        return splendorConfig.getNumberPlayer();
    }

    public List<SplendorGameConfig> getListGameConfig() {
        return splendorConfig.getConfig();
    }

    public SplendorGameConfig getGameConfig(int numberPlayer) {
        SplendorGameConfig gameConfig = splendorConfig.getConfig().stream()
                .filter(splendorGameConfig -> splendorGameConfig.getNumberPlayer() == numberPlayer)
                .findFirst()
                .orElse(null);
        if (gameConfig == null) {
            return null;
        }

        gameConfig.setEndgameScore(splendorConfig.getEndgameScore());
        gameConfig.setCards(splendorConfig.getCard());
        gameConfig.setNobles(splendorConfig.getNoble());
        return gameConfig;
    }

}
