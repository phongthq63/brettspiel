package com.brettspiel.boardgameguide.gateway.service.impl;

import cn.hutool.crypto.digest.DigestUtil;
import com.brettspiel.boardgameguide.gateway.constants.CommonConstants;
import com.brettspiel.boardgameguide.gateway.controller.dto.request.RefreshRequest;
import com.brettspiel.boardgameguide.gateway.controller.dto.response.LoginResponse;
import com.brettspiel.boardgameguide.gateway.entity.Account;
import com.brettspiel.boardgameguide.gateway.entity.Login;
import com.brettspiel.boardgameguide.gateway.repository.IAccountRepository;
import com.brettspiel.boardgameguide.gateway.repository.ILoginRepository;
import com.brettspiel.boardgameguide.gateway.service.ILoginService;
import com.brettspiel.security.JwtHandler;
import com.brettspiel.utils.IdGenerator;
import com.brettspiel.utils.R;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:22 AM
 */
@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements ILoginService {

    private final IAccountRepository accountRepository;

    private final ILoginRepository loginRepository;

    private final JwtHandler jwtHandler;


    @Override
    public R<LoginResponse> loginByUsernamePassword(String username, String password) {
        long now = System.currentTimeMillis();

        //Verify username + password
        String passwordEncode = DigestUtil.sha256Hex(password);
        Account account = accountRepository.findByUsernameAndPassword(username, passwordEncode);
        if (account == null) {
            return R.failed("Account not found");
        }
        if (account.getStatus() != null && account.getStatus() != CommonConstants.ACTIVE) {
            return R.failed("Account not active");
        }

        //Generate token
        String userId = account.getAccountId();
        // todo: Update when in prod
        userId = "test";
        String accessToken = jwtHandler.generateToken(userId, new HashMap<>() {
            {
                put("name", account.getUsername());
            }
        });
        String refreshToken = IdGenerator.nextUUID();
        loginRepository.insert(Login.builder()
                .accountId(userId)
                .username(account.getUsername())
                .refreshToken(refreshToken)
                .timeExpired(now + 86400)
                .timeDelete(LocalDateTime.now().plusDays(1))
                .build());
        LoginResponse loginResponse = LoginResponse.builder()
                .accessToken(accessToken)
                .tokenType("Bearer")
                .expiresIn(86400)
                .refreshToken(refreshToken)
                .build();
        return R.ok(loginResponse);
    }

    @Override
    public R<?> refresh(HttpServletResponse httpServletResponse, RefreshRequest body) {
        long now = System.currentTimeMillis();

        Login login = loginRepository.findByRefreshToken(body.getRefreshToken());
        if (login == null) {
            return R.failed("Invalid refresh token");
        }

        String accessToken = jwtHandler.generateToken(login.getAccountId(), new HashMap<>() {
            {
                put("name", login.getUsername());
            }
        });

        //add cookie
//        this.addCookieLogin(httpServletResponse, accessToken, body.getRefreshToken(), (int) (login.getTimeExpired() - now));

        return R.ok();
    }

//    private void addCookieLogin(HttpServletResponse httpServletResponse, String accessToken, String refreshToken) {
//        int maxAgeCookie = 86400;
//        //
//        Cookie cookieTokenType = new Cookie("token-type", "Bearer");
//        cookieTokenType.setMaxAge(maxAgeCookie);
//        cookieTokenType.setHttpOnly(false);
//        cookieTokenType.setSecure(true);
//        cookieTokenType.setDomain(crossDomain);
//        cookieTokenType.setPath("/");
//        httpServletResponse.addCookie(cookieTokenType);
//        //
//        Cookie cookieAccessToken = new Cookie("access-token", accessToken);
//        cookieAccessToken.setMaxAge(maxAgeCookie);
//        cookieAccessToken.setHttpOnly(false);
//        cookieAccessToken.setSecure(true);
//        cookieAccessToken.setDomain(crossDomain);
//        cookieAccessToken.setPath("/");
//        httpServletResponse.addCookie(cookieAccessToken);
//        //
//        Cookie cookieRefreshToken = new Cookie("refresh-token", refreshToken);
//        cookieRefreshToken.setMaxAge(maxAgeCookie);
//        cookieRefreshToken.setHttpOnly(false);
//        cookieRefreshToken.setSecure(true);
//        cookieRefreshToken.setDomain(crossDomain);
//        cookieRefreshToken.setPath("/");
//        httpServletResponse.addCookie(cookieRefreshToken);
//        //
//        Cookie cookieExpiresIn = new Cookie("expires-in", String.valueOf(maxAgeCookie));
//        cookieExpiresIn.setMaxAge(maxAgeCookie);
//        cookieExpiresIn.setHttpOnly(false);
//        cookieExpiresIn.setSecure(true);
//        cookieExpiresIn.setDomain(crossDomain);
//        cookieExpiresIn.setPath("/");
//        httpServletResponse.addCookie(cookieExpiresIn);
//    }
//
//    private void addCookieLogin(HttpServletResponse httpServletResponse, String accessToken, String refreshToken, int maxAgeCookie) {
//        //
//        Cookie cookieTokenType = new Cookie("token-type", "Bearer");
//        cookieTokenType.setMaxAge(maxAgeCookie);
//        cookieTokenType.setHttpOnly(false);
//        cookieTokenType.setSecure(true);
//        cookieTokenType.setDomain(crossDomain);
//        cookieTokenType.setPath("/");
//        httpServletResponse.addCookie(cookieTokenType);
//        //
//        Cookie cookieAccessToken = new Cookie("access-token", accessToken);
//        cookieAccessToken.setMaxAge(maxAgeCookie);
//        cookieAccessToken.setHttpOnly(false);
//        cookieAccessToken.setSecure(true);
//        cookieAccessToken.setDomain(crossDomain);
//        cookieAccessToken.setPath("/");
//        httpServletResponse.addCookie(cookieAccessToken);
//        //
//        Cookie cookieRefreshToken = new Cookie("refresh-token", refreshToken);
//        cookieRefreshToken.setMaxAge(maxAgeCookie);
//        cookieRefreshToken.setHttpOnly(false);
//        cookieRefreshToken.setSecure(true);
//        cookieRefreshToken.setDomain(crossDomain);
//        cookieRefreshToken.setPath("/");
//        httpServletResponse.addCookie(cookieRefreshToken);
//        //
//        Cookie cookieExpiresIn = new Cookie("expires-in", String.valueOf(maxAgeCookie));
//        cookieExpiresIn.setMaxAge(maxAgeCookie);
//        cookieExpiresIn.setHttpOnly(false);
//        cookieExpiresIn.setSecure(true);
//        cookieExpiresIn.setDomain(crossDomain);
//        cookieExpiresIn.setPath("/");
//        httpServletResponse.addCookie(cookieExpiresIn);
//    }

}
