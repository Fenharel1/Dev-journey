package com.backend.student;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StudentMapper {

  @Mapping(source = "name", target = "name")
  @Mapping(source = "age", target = "age")
  StudentDto toStudentDto(Student student);
}

