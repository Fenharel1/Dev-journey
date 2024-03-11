package com.reinhard.springjpa.student;

public record StudentResponseDto(
  String firstname,
  String lastname,
  String email
) {

}
