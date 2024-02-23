package com.reinhard.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.reinhard.backend.usersapp.backendusersapp.models.UserRequest;
import com.reinhard.backend.usersapp.backendusersapp.models.dto.UserDto;
import com.reinhard.backend.usersapp.backendusersapp.models.entities.User;

public interface IUserService {
  List<UserDto> findAll();
  
  Page<UserDto> findAll(Pageable pageable);

  Optional<UserDto> findById(Long id);

  UserDto save(User user);

  Optional<UserDto> update(UserRequest user, Long id);

  void remove(Long id);
}
