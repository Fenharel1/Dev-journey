package com.reinhard.jwtsecurity.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reinhard.jwtsecurity.models.User;
import com.reinhard.jwtsecurity.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

  private final UserRepository repository;

  @GetMapping("/all")
  public List<User> getAllUsers() {
    var allUsers = repository.findAll();
    return allUsers;
  }

}
