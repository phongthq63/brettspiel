package com.brettspiel.boardgameguide.game.service;

import com.brettspiel.boardgameguide.game.dto.BannerDTO;
import com.brettspiel.utils.R;

import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/27/2025 - 5:05 PM
 */
public interface IBannerService {

    R<List<BannerDTO>> getListBannerHome();

}
