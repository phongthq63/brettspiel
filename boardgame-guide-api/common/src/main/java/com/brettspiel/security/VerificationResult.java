package com.brettspiel.security;

import lombok.Data;

@Data
public class VerificationResult {

    private boolean validated;

    private String jti;

    private String sub;

    private String name;

}
