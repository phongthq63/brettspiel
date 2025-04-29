package com.brettspiel.boardgameguide.game.controller.page;

import com.brettspiel.boardgameguide.game.dto.BannerDTO;
import com.brettspiel.boardgameguide.game.service.IBannerService;
import com.brettspiel.utils.R;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 5:04 PM
 */
@Tag(name = "Home", description = "API cho trang chủ")
@RestController
@RequestMapping(value = "/home")
@RequiredArgsConstructor
public class HomeController {

    private final IBannerService bannerService;


    @GetMapping("/banner")
    @Operation(summary = "Lấy danh sách banner", description = "API này trả về danh sách các banner hiển thị trên trang chủ.")
    public R<List<BannerDTO>> getListBanner() {
        return bannerService.getListBannerHome();
    }

}
