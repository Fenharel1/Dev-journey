package com.reinhard.jwtsecurity.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reinhard.jwtsecurity.models.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
  public User findByUsername(String username);
}
