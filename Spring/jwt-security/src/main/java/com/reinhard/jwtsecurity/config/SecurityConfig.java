package com.reinhard.jwtsecurity.config;

import java.util.Arrays;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.reinhard.jwtsecurity.config.filters.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtValidationFilter jwtValidationFilter;
  private final AuthenticationProvider authenticationProvider;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(requests -> 
        requests
          .requestMatchers("POST","/api/auth/**")
          .permitAll()
          .anyRequest()
          .authenticated())
      // .addFilter(new JwtAuthenticationFilter(config.getAuthenticationManager()))
      // .addFilter(new JwtValidationFilter(jwtService))
      .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authenticationProvider(authenticationProvider)
      .addFilterBefore(jwtValidationFilter, UsernamePasswordAuthenticationFilter.class)
      // .addFilterBefore(jwtValidationFilter, UsernamePasswordAuthenticationFilter.class)
      ;

    return http.build();
  }
  
  // @Bean
  // CorsConfigurationSource corsConfigurationSource(){
  //   CorsConfiguration config = new CorsConfiguration();
  //   config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
  //   config.setAllowedOriginPatterns(Arrays.asList("*"));
  //   config.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
  //   config.setAllowedHeaders(Arrays.asList("Authorization", "Content-type"));
  //   config.setAllowCredentials(true);

  //   UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
  //   source.registerCorsConfiguration("/**", config);

  //   return source;
  // }

  // @Bean
  // FilterRegistrationBean<CorsFilter> corsFilter(){
  //   FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(corsConfigurationSource()));
  //   bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
  //   return bean;
  // }

}
