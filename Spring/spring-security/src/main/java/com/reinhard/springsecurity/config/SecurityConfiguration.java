package com.reinhard.springsecurity.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf
            .disable())
        .authorizeHttpRequests(requests -> requests
            // whitelist
            .requestMatchers("/api/auth/**")
            .permitAll()
            // any other request should be authenticated
            .anyRequest()
            .authenticated())
        .sessionManagement(management -> management
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authenticationProvider(authenticationProvider)
        // filter before usernamepasswordfilter
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  // @Bean
  // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws
  // Exception{
  // http
  // .csrf()
  // .disable()
  // .authorizeHttpRequests()
  // // whitelist
  // .requestMatchers("")
  // .permitAll()
  // // any other request should be authenticated
  // .anyRequest()
  // .authenticated()
  // // now configure the session management
  // .and()
  // .sessionManagement()
  // .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
  // // which authentication provider use
  // .and()
  // .authenticationProvider(authenticationProvider)
  // // filter before usernamepasswordfilter
  // .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

  // return http.build();
  // }
}
