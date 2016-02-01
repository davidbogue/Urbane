package com.surmize.controllers;

import com.surmize.models.AuthResponse;
import com.surmize.models.User;
import com.surmize.repository.UserRepository;
import com.surmize.utils.EncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class UserAuthController {

    private UserRepository userRepository;

    @Autowired
    public UserAuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/userauth")
    public AuthResponse authorizeUser(@RequestParam("email") String email,
                                @RequestParam("password") String password){
        User u = userRepository.findByEmail(email);
        if(u!= null){
            String passwordSent = EncryptionUtil.hashSHA256(password);
            if(passwordSent.equals(u.getPassword())){
                String sessionToken = UUID.randomUUID().toString();
                u.setSessionToken(sessionToken);
                userRepository.save(u);
                return new AuthResponse(true, u.getName(), sessionToken);
            }
        }
        return AuthResponse.failedResponse();
    }


}
