package com.brettspiel.boardgameguide.splendor.vo;

import com.brettspiel.service.vo.BaseVO;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 11/24/2024 - 1:02 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class FieldNobleVO extends BaseVO {

    private Integer position;

    private NobleVO noble;

}
