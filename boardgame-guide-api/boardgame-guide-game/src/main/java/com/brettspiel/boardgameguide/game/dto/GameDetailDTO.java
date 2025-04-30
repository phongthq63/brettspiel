package com.brettspiel.boardgameguide.game.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 7:13 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GameDetailDTO extends GameDTO {

    @Schema(description = "URL hình ảnh tên trò chơi", example = "https://example.com/images/name_game001.jpg")
    private String imageNameUrl;

    @Schema(description = "URL hình ảnh banner của trò chơi", example = "https://example.com/images/banner_game001.jpg")
    private String imageBannerUrl;

    @Schema(description = "Danh sách nhà thiết kế của trò chơi", example = "[\"Klaus Teuber\"]")
    private List<String> designers;

    @Schema(description = "Danh sách nghệ sĩ tham gia thiết kế trò chơi", example = "[\"Franz Vohwinkel\"]")
    private List<String> artists;

    @Schema(description = "Danh sách nhà xuất bản của trò chơi", example = "[\"Kosmos\", \"Mayfair Games\"]")
    private List<String> publishers;

    @Schema(description = "Năm phát hành của trò chơi", example = "1995")
    private String year;

}
