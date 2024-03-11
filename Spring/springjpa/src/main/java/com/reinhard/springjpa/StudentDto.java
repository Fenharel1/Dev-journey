package com.reinhard.springjpa;

public record StudentDto(
  String firstname, 
  String lastname,
  String email,
  Long schoolId
) {

}
