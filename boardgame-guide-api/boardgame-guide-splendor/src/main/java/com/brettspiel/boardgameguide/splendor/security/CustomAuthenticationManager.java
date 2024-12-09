package com.brettspiel.boardgameguide.splendor.security;

import com.brettspiel.security.JwtHandler;
import com.brettspiel.security.UnauthorizedException;
import com.brettspiel.security.VerificationResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * Created by Quach Thanh Phong
 * On 12/18/2023 - 10:41 AM
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthenticationManager implements AuthenticationManager {

    private final JwtHandler jwtHandler;



    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String token = authentication.getCredentials().toString();
        VerificationResult tokenResult = jwtHandler.verify(token);
        if (!tokenResult.isValidated()) {
            throw new UnauthorizedException("Invalid token");
        }

        UserPrincipal principal = new UserPrincipal(tokenResult.getSub(), tokenResult.getName());
        return new UsernamePasswordAuthenticationToken(principal, null, new ArrayList<>());
    }

}
