package com.reinhard.backend.usersapp.backendusersapp.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.reinhard.backend.usersapp.backendusersapp.models.entities.User;

public interface UserRepository extends CrudRepository<User, Long> {
  Optional<User> findByUsername(String username);

  @Query("select u from User u where u.username=?1")
  Optional<User> getUserByUsername(String usernamme);

  Page<User> findAll(Pageable pageable);
}