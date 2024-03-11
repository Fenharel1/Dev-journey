package com.reinhard.springjpa.student;

import jakarta.validation.constraints.NotEmpty;

public record StudentDto(
  @NotEmpty(message = "ponele un nombre malpario")
  String firstname, 
  @NotEmpty
  String lastname,
  String email,
  Long schoolId
) {
}
