package com.brettspiel.boardgameguide.gateway.controller.dto.response;

import com.brettspiel.service.dto.response.BaseResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 11:32 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
public class LoginResponse extends BaseResponse {

    @Schema(
            description = "Token",
            example = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3NDhiN2FiMTZiYTU0ZmIyYTI5NjA0M2U0M2FkOGUyMCIsImlzcyI6ImZsaXZlIiwiaWF0IjoxNjc4ODczODIzLCJuYmYiOjE2Nzg4NzM4MjMsImV4cCI6MTY3ODk2MDIyMywic3ViIjoiMTAwMDE2Iiwicm9sZXMiOlsidXNlciJdLCJuYW1lIjoiKzg0OTgzODkyMjQifQ.60ytCnpZ_6B3L6Na3zGA9YdEp7_-xgdOsA4zjq7PE-U"
    )
    private String accessToken;

    @Schema(description = "Loại token", example = "Bearer")
    private String tokenType;

    @Schema(description = "Thời gian hết hạn (s)", example = "3600")
    private Integer expiresIn;

    @Schema(description = "Token", example = "a31v351a6e3c02a00sc3a03")
    private String refreshToken;

}
