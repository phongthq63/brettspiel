package com.brettspiel.boardgameguide.splendor.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * Created by Quach Thanh Phong
 * On 12/18/2023 - 10:44 AM
 */
@Slf4j
@Component
public class CustomSecurityContextRepository implements SecurityContextRepository {

    @Autowired
    private AuthenticationManager authenticationManager;



    @Override
    public SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder) {
        String token;
        // Check in cookie
        if (requestResponseHolder.getRequest().getCookies() != null) {
            token = Arrays.stream(requestResponseHolder.getRequest().getCookies())
                    .filter(cookie -> cookie.getName().equals("access-token"))
                    .findFirst()
                    .map(Cookie::getValue)
                    .orElse(null);
            if (token != null) {
                Authentication auth = new UsernamePasswordAuthenticationToken(token, token);
                return new SecurityContextImpl(this.authenticationManager.authenticate(auth));
            }
        }

        // Check in header
        token = requestResponseHolder.getRequest().getHeader(HttpHeaders.AUTHORIZATION);
        if (token != null && token.startsWith("Bearer ")) {
            String authToken = token.substring(7);
            Authentication auth = new UsernamePasswordAuthenticationToken(authToken, authToken);
            return new SecurityContextImpl(this.authenticationManager.authenticate(auth));
        }

        return new SecurityContextImpl();
    }

    @Override
    public void saveContext(SecurityContext context, HttpServletRequest request, HttpServletResponse response) {

    }

    @Override
    public boolean containsContext(HttpServletRequest request) {
        return false;
    }

}
