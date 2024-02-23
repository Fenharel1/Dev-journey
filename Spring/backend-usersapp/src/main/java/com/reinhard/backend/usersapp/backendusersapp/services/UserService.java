package com.reinhard.backend.usersapp.backendusersapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reinhard.backend.usersapp.backendusersapp.models.IUser;
import com.reinhard.backend.usersapp.backendusersapp.models.UserRequest;
import com.reinhard.backend.usersapp.backendusersapp.models.dto.UserDto;
import com.reinhard.backend.usersapp.backendusersapp.models.dto.mapper.DtoMapperUser;
import com.reinhard.backend.usersapp.backendusersapp.models.entities.Role;
import com.reinhard.backend.usersapp.backendusersapp.models.entities.User;
import com.reinhard.backend.usersapp.backendusersapp.repositories.RoleRepository;
import com.reinhard.backend.usersapp.backendusersapp.repositories.UserRepository;

@Service
public class UserService implements IUserService {

  @Autowired
  private UserRepository repository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  @Transactional(readOnly = true)
  public List<UserDto> findAll() {
    var users = (List<User>) repository.findAll();
    return users.stream()
        .map(u -> DtoMapperUser.builder().setUser(u).build())
        .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<UserDto> findById(Long id) {
    var o = repository.findById(id);
    return o.map(u -> DtoMapperUser.builder().setUser(u).build());
  }

  @Override
  @Transactional
  public UserDto save(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRoles(getRoles(user));
    return DtoMapperUser.builder().setUser(repository.save(user)).build();
  }

  @Override
  @Transactional
  public void remove(Long id) {
    repository.deleteById(id);
  }

  @Override
  @Transactional
  public Optional<UserDto> update(UserRequest user, Long id) {
    Optional<User> op = repository.findById(id);
    User userAdded = null;
    if (op.isPresent()) {
      User userDb = op.orElseThrow();
      userDb.setRoles(getRoles(user));
      userDb.setUsername(user.getUsername());
      userDb.setEmail(user.getEmail());
      userAdded = repository.save(userDb);
    }
    return Optional.ofNullable(DtoMapperUser.builder().setUser(userAdded).build());
  }

  private List<Role> getRoles(IUser user) {
    List<Role> roles = new ArrayList<>();

    Optional<Role> o = roleRepository.findByname("ROLE_USER");
    if (o.isPresent()) {
      roles.add(o.orElseThrow());
    }

    if (user.isAdmin()) {
      var oa = roleRepository.findByname("ROLE_ADMIN");
      if (oa.isPresent()) {
        roles.add(oa.orElseThrow());
      }
    }
    return roles;
  }

  @Override
  @Transactional(readOnly = true)
  public Page<UserDto> findAll(Pageable pageable) {
    Page<User> usersPage = repository.findAll(pageable);
    return usersPage.map(u -> DtoMapperUser.builder().setUser(u).build());
  }
}
