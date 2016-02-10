package com.surmize.setup;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UrbaneAuthenticationProvider implements AuthenticationProvider, AuthenticationManager {

    static final List<GrantedAuthority> AUTHORITIES = new ArrayList<>();

    static {
        AUTHORITIES.add(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        Authentication authentication = new UrbaneAuthenticationToken("user","credentials",AUTHORITIES);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return (UrbaneAuthenticationToken.class.isAssignableFrom(aClass));
    }
}
