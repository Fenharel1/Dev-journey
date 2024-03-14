package com.reinhard.jwtsecurity.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtValidationFilter extends OncePerRequestFilter {

  public JwtValidationFilter(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  private final JwtService jwtService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    var header = request.getHeader("Authorization");
    if(header != null && header.startsWith("Bearer ")){
      var token = header.substring(7);
      Claims claims = jwtService.extractClaims(token);
      String username = claims.getSubject();
      if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){

        // List<GrantedAuthority> authorities = Arrays.asList(
        //   new ObjectMapper().readValue(claims.get("authorities").toString().getBytes(), SimpleGrantedAuthority[].class ) );

        if(jwtService.extractClaims(token).getExpiration().after(new Date())){
          UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
            username,
            null,
            // authorities
            null
          );
          SecurityContextHolder.getContext().setAuthentication(auth);
        }
      }

    }
    filterChain.doFilter(request, response);
  }

}
