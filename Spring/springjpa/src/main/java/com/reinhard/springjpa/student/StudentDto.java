package com.reinhard.springjpa.student;

import jakarta.validation.constraints.NotEmpty;

public record StudentDto(
  @NotEmpty
  String firstname, 
  @NotEmpty
  String lastname,
  String email,
  Long schoolId
) {
}
