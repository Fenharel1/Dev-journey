package com.reinhard.jwtsecurity.config.filters;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reinhard.jwtsecurity.models.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  public final AuthenticationManager authenticationManager;

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
      throws AuthenticationException {
    User user = null;
    try{
      user = new ObjectMapper().readValue(request.getInputStream(), User.class);
    }catch(Exception e){
      System.out.println(e);
    }
    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
    return authenticationManager.authenticate(authToken);
  }

  // @Override
  // protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
  //     Authentication authResult) throws IOException, ServletException {
  //   return 
  // }

  // @Override
  // protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
  //     AuthenticationException failed) throws IOException, ServletException {
  //   // TODO Auto-generated method stub
  //   super.unsuccessfulAuthentication(request, response, failed);
  // }

  

}
