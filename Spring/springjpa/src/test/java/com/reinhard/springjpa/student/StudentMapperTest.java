package com.reinhard.springjpa.student;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class StudentMapperTest {

  private StudentMapper mapper;

  @Test
  public void shouldMapStudentDtoToStudent() {
    StudentDto dto = new StudentDto("John", "Doe", "john@email", 1L);
    Student student = mapper.toStudent(dto);

    Assertions.assertEquals(dto.firstname(), student.getFirstname());
    Assertions.assertEquals(dto.lastname(), student.getLastname());
    Assertions.assertEquals(dto.email(), student.getEmail());
    Assertions.assertNotNull(student.getSchool());
    Assertions.assertEquals(dto.schoolId(), student.getSchool().getId());
  }

  @Test
  public void shouldMapStudentToStudentResponseDto() {
    Student student = new Student("John","Doe","john@email", 33);
    StudentResponseDto response = mapper.toStudentResponseDto(student); 

    Assertions.assertEquals(student.getFirstname(), response.firstname());
    Assertions.assertEquals(student.getLastname(), response.lastname());
    Assertions.assertEquals(student.getEmail(), response.email());
  }

  @Test 
  public void should_throw_null_pointer_exception_when_studentDto_is_nul(){
    var msg = Assertions.assertThrows(NullPointerException.class, () -> mapper.toStudent(null) );
    Assertions.assertEquals(msg.getMessage(), "the student shouldn't be null");
  }

  @Test
  public void shouldMapStudentListToStudentResponseDtoList(){
    List<Student> students = new ArrayList<>();
    students.add(new Student("tom","doe","tom@email",21));

    List<StudentResponseDto> reponse = mapper.toListStudentResponseDtos(students);

    Assertions.assertEquals(students.size(), reponse.size());
  }

  @BeforeEach
  void setUp() {
    mapper = new StudentMapper();
  }

  // @AfterEach
  // void tearDown(){
  // System.out.println("inside the after each method");
  // }

  // @BeforeAll
  // static void beforeAll(){
  // System.out.println("inside the before all method");
  // }

  // @AfterAll
  // static void afterAll(){
  // System.out.println("inside the after all method");
  // }
}
