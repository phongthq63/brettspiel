package com.brettspiel.boardgameguide.game.config.mongodb;

import com.mongodb.event.CommandFailedEvent;
import com.mongodb.event.CommandListener;
import com.mongodb.event.CommandStartedEvent;
import com.mongodb.event.CommandSucceededEvent;
import lombok.extern.slf4j.Slf4j;

/**
 * Created by Quach Thanh Phong
 * On 12/16/2023 - 8:04 PM
 */
@Slf4j
public class CustomCommandListener implements CommandListener {

    @Override
    public void commandStarted(CommandStartedEvent event) {
        log.info("Mongo command: {} | {} | {}", event.getDatabaseName(), event.getDatabaseName(), event.getCommand());
    }

    @Override
    public void commandSucceeded(CommandSucceededEvent event) {
    }

    @Override
    public void commandFailed(CommandFailedEvent event) {
    }

}
