package com.brettspiel.boardgameguide.gateway.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by Quach Thanh Phong
 * On 5/16/2025 - 12:35 AM
 */
@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Document("account")
public class Account extends BaseMongodbEntity {

    @Field("account_id")
    private String accountId;

    private String email;

    private String username;

    private String password;

    private Integer status;

}
