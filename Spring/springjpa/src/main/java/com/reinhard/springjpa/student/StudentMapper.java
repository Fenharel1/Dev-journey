package com.reinhard.springjpa.student;

import java.util.List;

import org.springframework.stereotype.Service;

import com.reinhard.springjpa.school.School;

@Service
public class StudentMapper {
  public Student toStudent(StudentDto dto) {
    if(dto == null) throw new NullPointerException("the student shouldn't be null");
    var student = new Student();

    var school = new School();
    school.setId(dto.schoolId());

    student.setFirstname(dto.firstname());
    student.setLastname(dto.lastname());
    student.setEmail(dto.email());
    student.setSchool(school);
    return student;
  }

  public StudentResponseDto toStudentResponseDto(Student student) {
    return new StudentResponseDto(
        student.getFirstname(),
        student.getLastname(),
        student.getEmail());
  }

  public List<StudentResponseDto> toListStudentResponseDtos(List<Student> students){
    return students.stream().map(this::toStudentResponseDto).toList();
  }
}
