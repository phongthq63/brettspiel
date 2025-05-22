package com.brettspiel.boardgameguide.splendor.utils;

import cn.hutool.json.JSONUtil;
import com.brettspiel.boardgameguide.splendor.entity.SplendorConfig;
import com.brettspiel.boardgameguide.splendor.entity.SplendorGameConfig;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * Created by Quach Thanh Phong
 * On 11/21/2024 - 11:11 AM
 */
@Component
@RequiredArgsConstructor
public class GameUtils {

    private SplendorConfig splendorConfig;


    private final ResourceLoader resourceLoader;



    @PostConstruct
    public void init() throws IOException {
        splendorConfig = JSONUtil.toBean(StreamUtils.copyToString(resourceLoader.getResource("classpath:config/SplendorConfig.json").getInputStream(), StandardCharsets.UTF_8), SplendorConfig.class);
    }


    public SplendorGameConfig getGameConfig(int numberPlayer) {
        SplendorGameConfig splendorGameConfig = splendorConfig.getConfigs().stream()
                .filter(splendorSplendorGameConfig -> splendorSplendorGameConfig.getNumberPlayer() == numberPlayer)
                .findFirst()
                .orElse(null);
        if (splendorGameConfig == null) {
            return null;
        }

        if (splendorGameConfig.getEndgameScore() == null) {
            splendorGameConfig.setEndgameScore(splendorConfig.getEndgameScore());
        }
        if (splendorGameConfig.getCards() == null) {
            splendorGameConfig.setCards(splendorConfig.getCards());
        }
        if (splendorGameConfig.getNobles() == null) {
            splendorGameConfig.setNobles(splendorConfig.getNobles());
        }
        return splendorGameConfig;
    }

}
