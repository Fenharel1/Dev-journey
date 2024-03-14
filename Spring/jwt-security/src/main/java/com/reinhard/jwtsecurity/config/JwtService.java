package com.reinhard.jwtsecurity.config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.reinhard.jwtsecurity.repositories.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {
  @Value("${jwt.key}")
  private String SecretKey;


  public String extractUsername(String token){
    return extractClaims(token).getSubject();
  }

  public Claims extractClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(getSecretKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }

  public String generateToken(UserDetails userDetails, HashMap<String,?> claims){
    return Jwts.builder()
      .setClaims(claims)
      .setSubject(userDetails.getUsername())
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 10))
      .signWith(getSecretKey(), SignatureAlgorithm.HS256)
      .compact();
  }

  private Key getSecretKey() {
    byte[] bytes = SecretKey.getBytes();
    return Keys.hmacShaKeyFor(bytes);
  }
}
