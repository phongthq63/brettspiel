package com.brettspiel.boardgameguide.gateway.entity;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:28 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@Document("login")
public class Login extends BaseMongodbEntity {

    @Field("account_id")
    private String accountId;

    private String username;

    @Field("organization_id")
    private String organizationId;

    @Field("refresh_token")
    private String refreshToken;

    @Field("time_expired")
    private Long timeExpired;

    @Field("time_delete")
    private LocalDateTime timeDelete;

}
