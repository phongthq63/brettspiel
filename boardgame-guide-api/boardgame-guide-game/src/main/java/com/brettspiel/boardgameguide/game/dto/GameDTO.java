package com.brettspiel.boardgameguide.game.dto;

import com.brettspiel.service.dto.BaseDTO;
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
public class GameDTO extends BaseDTO {

    @Schema(description = "Mã định danh duy nhất của trò chơi", example = "game001")
    private String id;

    @Schema(description = "URL hình ảnh của trò chơi", example = "https://example.com/images/game001.jpg")
    private String imageUrl;

    @Schema(description = "URL hình ảnh hộp trò chơi", example = "https://example.com/images/box_game001.jpg")
    private String imageBoxUrl;

    @Schema(description = "Tên của trò chơi", example = "Cờ tỷ phú")
    private String name;

    @Schema(description = "Tiêu đề của trò chơi", example = "Trò chơi kinh điển về đầu tư và tài chính")
    private String title;

    @Schema(description = "Mô tả chi tiết về trò chơi", example = "Cờ tỷ phú là một trò chơi kinh điển, nơi người chơi cạnh tranh để trở thành người giàu nhất.")
    private String description;

    @Schema(description = "Thời gian chơi tối thiểu (phút)", example = "30")
    private Integer minPlayTime;

    @Schema(description = "Thời gian chơi tối đa (phút)", example = "120")
    private Integer maxPlayTime;

    @Schema(description = "Số lượng người chơi tối thiểu", example = "2")
    private Integer minPlayers;

    @Schema(description = "Số lượng người chơi tối đa", example = "6")
    private Integer maxPlayers;

    @Schema(description = "Danh sách thể loại của trò chơi")
    private List<GenreDTO> genres;

    @Schema(description = "Trò chơi có phổ biến không", example = "true")
    private Boolean popular;

    @Schema(description = "Trò chơi có đang hot không", example = "false")
    private Boolean hot;

    @Schema(description = "Trò chơi có được đánh giá cao không", example = "true")
    private Boolean topRated;

    @Schema(description = "URL chơi trò chơi", example = "/gameplay/catan")
    private String playUrl;

}
