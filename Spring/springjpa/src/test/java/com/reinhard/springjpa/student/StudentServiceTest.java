package com.reinhard.springjpa.student;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

public class StudentServiceTest {
  
  @InjectMocks
  private StudentService studentService;

  @Mock
  private StudentMapper mapper;

  @Mock
  private StudentRepository repository;

  @BeforeEach
  void setUp(){
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testDeleteStudent() {

  }

  @Test
  void testGetStudentById() {

  }

  @Test
  void testGetStudents() {

  }

  @Test
  void testGetStudentsByWord() {

  }

  @Test
  void shouldSuccessfullySaveStudents() {
    // given
    StudentDto dto = new StudentDto(
      "john", "doe", "john@email", 1L);
    Student student = new Student(
      "john","doe","john@email",20
    );
    Student savedStudent = new Student(
      "john","doe","john@email",20
    );
    savedStudent.setId(1L);
    
    Mockito.when(mapper.toStudent(dto)).thenReturn(student);
    Mockito.when(repository.save(student)).thenReturn(savedStudent);
    Mockito.when(mapper.toStudentResponseDto(savedStudent)).thenReturn(new StudentResponseDto("john", "doe", "john@email"));
    
    // when

    StudentResponseDto response = studentService.saveStudent(dto);

    // then
    assertEquals(dto.firstname(), response.firstname());
    assertEquals(dto.lastname(), response.lastname());
    assertEquals(dto.email(), response.email());
  }
}
