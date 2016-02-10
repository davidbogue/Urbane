package com.surmize;

import com.surmize.filters.AuthenticationFilter;
import com.surmize.setup.UrbaneAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class UrbaneApplication {

    public static void main(String[] args) {
        SpringApplication.run(UrbaneApplication.class, args);
    }

    @Bean
    @Autowired
    public WebSecurityConfigurerAdapter security(UrbaneAuthenticationProvider urbaneAuthenticationProvider, AuthenticationFilter authFilter){
        return new WebSecurityConfigurerAdapter() {

            @Override
            protected void configure(HttpSecurity http) throws Exception {
                http.addFilterBefore(corsFilter(), ChannelProcessingFilter.class)
                        .addFilterAfter(authFilter, SecurityContextPersistenceFilter.class)
                        .csrf().disable()
                        .authorizeRequests()
                        .antMatchers(HttpMethod.GET, "/api/articles/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/api/blogProfiles/**").permitAll()
                        .antMatchers("/api/userauth").permitAll()
                        .anyRequest().hasAuthority("USER")
                        .and()
                        .httpBasic();
            }

            @Override
            protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.authenticationProvider(urbaneAuthenticationProvider)
                        .parentAuthenticationManager(urbaneAuthenticationProvider);
            }

            private CorsFilter corsFilter() {
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowCredentials(true);
                config.addAllowedOrigin("*");
                config.addAllowedHeader("*");
                config.addAllowedMethod("GET");
                config.addAllowedMethod("PUT");
                config.addAllowedMethod("POST");
                config.addAllowedMethod("DELETE");
                config.addAllowedMethod("PATCH");
                config.addAllowedHeader("auth_token");
                source.registerCorsConfiguration("/api/**", config);
                return new CorsFilter(source);
            }
        };
    }

    // The auth fitler is getting called twice because it is on the security fitler chain
    // but Spring Boot also recognizes it and adds it to the default fitler chain
    // this is to disable the default instance of the auth filter
    @Bean
    @Autowired
    public FilterRegistrationBean filter(AuthenticationFilter authFilter) {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(authFilter);
        filterRegistrationBean.setEnabled(false);
        return filterRegistrationBean;
    }
}
