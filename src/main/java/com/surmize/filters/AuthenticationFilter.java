package com.surmize.filters;

import com.surmize.models.User;
import com.surmize.repository.UserRepository;
import com.surmize.setup.UrbaneAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class AuthenticationFilter implements Filter {

    static final List<GrantedAuthority> AUTHORITIES = new ArrayList<GrantedAuthority>();

    static {
        AUTHORITIES.add(new SimpleGrantedAuthority("USER"));
    }

    @Autowired
    private UserRepository userRepository;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("INSIDE AUTH FITLER: " + ((HttpServletRequest)servletRequest).getRequestURL().toString());
        if(servletRequest instanceof HttpServletRequest){
            HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
            String authToken = httpRequest.getHeader("auth_token");
            if(authToken != null){
                System.out.println(authToken);
                User u = userRepository.findBySessionToken(authToken);
                if(u != null){
                    Authentication authentication = new UrbaneAuthenticationToken(u,AUTHORITIES);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        filterChain.doFilter(servletRequest,servletResponse);
    }

    @Override
    public void destroy() {

    }
}
