package com.brettspiel.boardgameguide.socket.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.security.Principal;

/**
 * Created by Quach Thanh Phong
 * On 12/18/2023 - 10:40 AM
 */
@Getter
@Data
@AllArgsConstructor
public class UserPrincipal implements Principal {

    private final String id;

    private final String name;

}
