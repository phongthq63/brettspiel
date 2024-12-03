package com.brettspiel.security;

import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTPayload;
import cn.hutool.jwt.signers.JWTSigner;
import cn.hutool.jwt.signers.JWTSignerUtil;
import com.brettspiel.utils.IdGenerator;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Slf4j
@Component
public class JwtHandler {

    @Value("${jwt.secret:#{''}}")
    private String jwtSecret;

    @Value("${jwt.issuer:brettspiel}")
    private String issuer;



    public String generateToken(String id, Map<String, Object> payloads) {
        Date now = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);
        calendar.add(Calendar.HOUR, 24);
        Date expiredAt = calendar.getTime();
        JWTSigner jwtSigner = JWTSignerUtil.hs256(jwtSecret.getBytes(StandardCharsets.UTF_8));

        JWT jwt = JWT.create()
                .setSigner(jwtSigner)
                .setJWTId(IdGenerator.nextUUID())
                .setIssuer(this.issuer)
                .setIssuedAt(now)
                .setNotBefore(now)
                .setExpiresAt(expiredAt)
                .setSubject(id)
                .addPayloads(payloads);
        return jwt.sign();
    }

    @SneakyThrows
    public VerificationResult verify(String token) {
        JWTSigner jwtSigner = JWTSignerUtil.hs256(jwtSecret.getBytes(StandardCharsets.UTF_8));
        JWT jwt = JWT.of(token).setSigner(jwtSigner);
        boolean result = jwt.validate(0);
        VerificationResult verificationResult = new VerificationResult();
        verificationResult.setValidated(result);
        if (!result) {
            return verificationResult;
        }
        JWTPayload payload = jwt.getPayload();
        verificationResult.setJti((String) payload.getClaim("jti"));
        verificationResult.setSub((String) payload.getClaim("sub"));
        verificationResult.setName((String) payload.getClaim("name"));
        return verificationResult;
    }

}
