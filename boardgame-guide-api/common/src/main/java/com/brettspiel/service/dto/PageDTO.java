package com.brettspiel.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/5/2023 - 2:36 PM
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageDTO<T> {

    @Builder.Default
    private List<T> list = new ArrayList<>();

    @Builder.Default
    private int page = 0;

    @Builder.Default
    private int size = 0;

    @Builder.Default
    private long total = 0;

}
