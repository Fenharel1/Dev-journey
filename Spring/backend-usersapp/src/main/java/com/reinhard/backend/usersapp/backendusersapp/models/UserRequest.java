package com.reinhard.backend.usersapp.backendusersapp.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class UserRequest implements IUser {

  @NotBlank
  @Size(min=2,max=10)
  private String username;

  @NotEmpty
  @Email
  private String email;

  private boolean admin;

  @Override
  public boolean isAdmin() {
    return admin;
  }
  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
  public String getUsername() {
    return username;
  }
  public void setUsername(String username) {
    this.username = username;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }

  
}
