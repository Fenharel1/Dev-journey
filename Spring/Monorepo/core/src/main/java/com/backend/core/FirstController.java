package com.backend.core;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/core")
@RequiredArgsConstructor
public class FirstController {

  private final UserMapper modelMapper;

  @GetMapping
  public UserDto greetings(){
    return modelMapper.toUserDto(User.builder()
        .name("Jose jose")
        .code("182092")
      .build());
  }
}
