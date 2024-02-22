package com.reinhard.backend.usersapp.backendusersapp.models.dto.mapper;

import com.reinhard.backend.usersapp.backendusersapp.models.dto.UserDto;
import com.reinhard.backend.usersapp.backendusersapp.models.entities.User;

public class DtoMapperUser {

  private User user;

  private DtoMapperUser(){

  }

  public static DtoMapperUser builder() {
    return new DtoMapperUser();
  }

  public DtoMapperUser setUser(User user) {
    this.user = user;
    return this;
  }

  public UserDto build(){
    if(user == null) throw new RuntimeException("Debe pasar el entity user");
    boolean isAdmin = user.getRoles().stream().anyMatch(r -> r.getName().equals("ROLE_ADMIN"));
    return new UserDto(this.user.getId(), this.user.getUsername(), this.user.getEmail(), isAdmin);
  }
}
