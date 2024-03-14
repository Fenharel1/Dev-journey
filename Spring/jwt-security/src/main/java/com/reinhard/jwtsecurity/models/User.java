package com.reinhard.jwtsecurity.models;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_2")
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String username;
  private String email;
  private String password;

  @ManyToMany
  @JoinTable(
    name = "UserRole",
    joinColumns = @JoinColumn(name="userId",referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name="roleId",referencedColumnName = "id"),
    uniqueConstraints = { @UniqueConstraint(columnNames = {"userId","roleId"}) }
  )
  private List<Role> roles;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).toList();
  }
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }
  @Override
  public boolean isEnabled() {
    return true;
  }
}
