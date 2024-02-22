package com.reinhard.backend.usersapp.backendusersapp.auth.filters;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reinhard.backend.usersapp.backendusersapp.auth.SimpleGrantedAuthorityJsonCreator;
import com.reinhard.backend.usersapp.backendusersapp.auth.TokenJwtConfig;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtValidationFilter extends BasicAuthenticationFilter {

  public JwtValidationFilter(AuthenticationManager authenticationManager) {
    super(authenticationManager);
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    String header = request.getHeader(TokenJwtConfig.HEADER_AUTHORIZATION);
    if(header == null || !header.startsWith(TokenJwtConfig.PREFIX_TOKEN)){
      chain.doFilter(request, response);
      return;
    }
    String token = header.replace(TokenJwtConfig.PREFIX_TOKEN, "");
    // byte[] tokenDecodeBytes = Base64.getDecoder().decode(token);
    // String tokenDecode = new String(tokenDecodeBytes);
    // String[] tokenArr = tokenDecode.split(":");
    // String secret = tokenArr[0];
    // String username = tokenArr[1];

    try {

      Claims claims = Jwts.parser()
      .verifyWith(TokenJwtConfig.SECRET_KEY)
      .build()
      .parseSignedClaims(token)
      .getPayload();

      Object authoritiesClaims = claims.get("authorities");

      String username = claims.getSubject();
      // Object someclaim = claims.get("something");

      // List<GrantedAuthority> authorities = new ArrayList<>();
      // authorities.add(new SimpleGrantedAuthority("ROL_USER"));

      List<GrantedAuthority> authorities = Arrays.asList(
        new ObjectMapper()
        .addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthorityJsonCreator.class)
        .readValue(authoritiesClaims.toString().getBytes(),
        SimpleGrantedAuthority[].class));

      UsernamePasswordAuthenticationToken authentication = 
        new UsernamePasswordAuthenticationToken(username, null, authorities);

      SecurityContextHolder.getContext().setAuthentication(authentication);
      chain.doFilter(request, response);

    } catch (JwtException e){
      Map<String, String> body = new HashMap<>();
      body.put("message", "El token no es valido");
      body.put("error",e.getMessage());
      response.getWriter().write(new ObjectMapper().writeValueAsString(body));
      response.setStatus(401);
      response.setContentType("application/json");
    }
  }
}
