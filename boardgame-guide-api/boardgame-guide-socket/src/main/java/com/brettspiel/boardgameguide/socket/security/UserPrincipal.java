package com.brettspiel.boardgameguide.socket.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.security.Principal;

/**
 * Created by Quach Thanh Phong
 * On 12/18/2023 - 10:40 AM
 */
@Data
@AllArgsConstructor
public class UserPrincipal implements Principal {

    @Getter
    private final String id;

    @Getter
    private final String name;

}
