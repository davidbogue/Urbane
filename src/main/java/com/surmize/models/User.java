package com.surmize.models;


import com.surmize.utils.EncryptionUtil;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

    private @Id
    @GeneratedValue
    Long id;
    private String email;
    private String password;
    private String name;
    private String role;
    private String sessionToken;

    public User(){}

    public User(String email, String password, String name, String role) {
        this.email = email;
        this.password = (password != null) ? EncryptionUtil.hashSHA256(password) : null;
        this.name = name;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = (password != null) ? EncryptionUtil.hashSHA256(password) : null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getSessionToken() {
        return sessionToken;
    }

    public void setSessionToken(String sessionToken) {
        this.sessionToken = sessionToken;
    }
}
