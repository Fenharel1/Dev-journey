package com.reinhard.springjpa.student;

public record StudentDto(
  String firstname, 
  String lastname,
  String email,
  Long schoolId
) {

}
