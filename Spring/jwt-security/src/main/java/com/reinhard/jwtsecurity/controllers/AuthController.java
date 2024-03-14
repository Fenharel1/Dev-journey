package com.reinhard.jwtsecurity.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.reinhard.jwtsecurity.config.JwtService;
import com.reinhard.jwtsecurity.models.User;
import com.reinhard.jwtsecurity.models.UserLogin;
import com.reinhard.jwtsecurity.models.UserRegister;
import com.reinhard.jwtsecurity.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  @PostMapping("/register")
  public String register(@RequestBody UserRegister user) {
    var userToSave = User.builder().username(user.username()).email(user.email())
        .password(passwordEncoder.encode(user.password())).build();
    var userSaved = repository.save(userToSave);

    var token = jwtService.generateToken(userSaved, new HashMap<>());
    return token;
  }

  @PostMapping("/login")
  public String login(@RequestBody UserLogin login) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.username(), login.password())); 
    var user = User.builder().username(login.username()).build();
    var token = jwtService.generateToken(user, new HashMap<>());
    return token;
  }
  
}
