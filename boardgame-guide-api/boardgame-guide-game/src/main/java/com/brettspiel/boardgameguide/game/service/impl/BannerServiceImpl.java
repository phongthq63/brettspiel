package com.brettspiel.boardgameguide.game.service.impl;

import com.brettspiel.boardgameguide.game.dto.BannerDTO;
import com.brettspiel.boardgameguide.game.entity.Banner;
import com.brettspiel.boardgameguide.game.mapper.BannerMapper;
import com.brettspiel.boardgameguide.game.repository.IBannerRepository;
import com.brettspiel.boardgameguide.game.service.IBannerService;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 5:06 PM
 */
@Service
@RequiredArgsConstructor
public class BannerServiceImpl implements IBannerService {

    private final IBannerRepository bannerRepository;

    private final BannerMapper bannerMapper;


    @Override
    public R<List<BannerDTO>> getListBannerHome() {
        List<Banner> banners = bannerRepository.findAll();
        List<BannerDTO> bannerDTOS = banners.stream()
                .map(bannerMapper::toBannerDTO)
                .toList();

        return R.ok(bannerDTOS);
    }
}
