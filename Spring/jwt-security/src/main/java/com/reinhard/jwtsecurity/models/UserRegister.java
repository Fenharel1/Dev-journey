package com.reinhard.jwtsecurity.models;

public record UserRegister(
  String username,
  String password,
  String email
) {

}
