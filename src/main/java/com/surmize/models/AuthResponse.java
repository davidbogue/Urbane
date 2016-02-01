package com.surmize.models;

import lombok.Data;

@Data
public class AuthResponse {

    private boolean success = false;
    private String userName;
    private String sessionToken;

    public AuthResponse(boolean success, String userName, String sessionToken) {
        this.success = success;
        this.userName = userName;
        this.sessionToken = sessionToken;
    }

    public static AuthResponse failedResponse(){
        return new AuthResponse(false,null,null);
    }
}
