package com.brettspiel.boardgameguide.gateway.service.impl;

import cn.hutool.crypto.digest.DigestUtil;
import com.brettspiel.boardgameguide.gateway.constants.CommonConstants;
import com.brettspiel.boardgameguide.gateway.entity.Account;
import com.brettspiel.boardgameguide.gateway.repository.IAccountRepository;
import com.brettspiel.boardgameguide.gateway.service.IRegisterService;
import com.brettspiel.utils.IdGenerator;
import com.brettspiel.utils.R;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:44 AM
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements IRegisterService {

    private final IAccountRepository accountRepository;


    @Override
    public R<?> registerByUsernamePassword(String email, String password, String confirmPassword) {
        if (!Objects.equals(password, confirmPassword)) {
            return R.failed("Password and confirm password not same");
        }

        // Kiem tra email ton tai ko
        Account account = accountRepository.findByEmail(email);
        if (account != null) {
            return R.failed("Email existed");
        }

        // Create account
        String passwordEncode = DigestUtil.sha256Hex(password);
        String accountId = IdGenerator.nextUUID();
        account = Account.builder()
                .accountId(accountId)
                .email(email)
                .username(email)
                .password(passwordEncode)
                .status(CommonConstants.ACTIVE)
                .build();
        accountRepository.insert(account);
        return R.ok();
    }
}
