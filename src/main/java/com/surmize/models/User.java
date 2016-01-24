package com.surmize.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class User {

    private @Id
    @GeneratedValue
    Long id;
    private String email;
    private String password;
    private String name;
    private String role;

    public User(){}

    public User(String email, String password, String name, String role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }
}
