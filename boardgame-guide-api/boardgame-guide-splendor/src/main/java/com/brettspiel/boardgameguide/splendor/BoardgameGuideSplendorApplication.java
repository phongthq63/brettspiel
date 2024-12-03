package com.brettspiel.boardgameguide.splendor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by Quach Thanh Phong
 * On 11/10/2024 - 12:31 PM
 */
@Slf4j
@SpringBootApplication(scanBasePackages = "com.brettspiel")
public class BoardgameGuideSplendorApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoardgameGuideSplendorApplication.class, args);
    }

}
