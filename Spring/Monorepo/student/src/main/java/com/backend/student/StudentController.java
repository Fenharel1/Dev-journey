package com.backend.student;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
public class StudentController {

  private final StudentMapper modelMapper;

  @GetMapping
  public StudentDto greetings() {
    return modelMapper.toStudentDto(Student.builder()
      .name("Reinhard")
      .lastname("Conde")
      .age(20)
      .build());
  }
}