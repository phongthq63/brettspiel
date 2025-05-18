package com.brettspiel.boardgameguide.game.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 7:13 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GameDetailDTO extends GameDTO {

    @Schema(description = "URL hướng dẫn chơi trò chơi", example = "/gameplay/catan")
    private String tutorialUrl;

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

    @Schema(description = "Số lần trò chơi đã được chơi", example = "12345")
    private Integer gamesPlayed;

    @Schema(description = "Độ phức tạp của trò chơi (1-5)", example = "3")
    private Integer complexity;

    @Schema(description = "Chỉ số chiến lược của trò chơi (1-5)", example = "4")
    private Integer strategy;

    @Schema(description = "Chỉ số may mắn của trò chơi (1-5)", example = "4")
    private Integer luck;

    @Schema(description = "Chỉ số tương tác của trò chơi (1-5)", example = "4")
    private Integer interaction;

    @Schema(description = "Danh sách luật chơi của trò chơi")
    private List<GameRuleDTO> rules;

    @Schema(description = "Danh sách video của trò chơi")
    private List<GameVideoDTO> videos;

    @Schema(description = "Danh sách liên kết đến các tài nguyên bên ngoài của trò chơi")
    private List<GameLinkDTO> links;

    @Schema(description = "Danh sách mở rộng của trò chơi")
    private List<GameExpansionDTO> expansions;

    @Schema(description = "Thông tin chuẩn bị cho trò chơi")
    private Map<String, Object> setup;

}
