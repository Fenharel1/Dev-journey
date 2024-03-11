package com.reinhard.springjpa;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
public class StudentController {

  private final StudentRepository repository;

  public StudentController(StudentRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/hello")
  public String getMethodName() {
    return "hola mundo";
  }

  @PostMapping("/students")
  public StudentResponseDto createStudent(@RequestBody StudentDto studentDto) {
    return toStudentDto(repository.save(toStudent(studentDto)));
  }

  @GetMapping("/students")
  public List<Student> getStudents() {
    return repository.findAll();
  }

  @GetMapping("/students/{id}")
  public Student getStudents(@PathVariable Long id) {
    return repository.findById(id).orElse(new Student());
  }

  @GetMapping("/students/search/{student-name}")
  public List<Student> getStudentsByWord(
      @PathVariable("student-name") String name) {
    return repository.findAllByFirstnameContaining(name);
  }

  @DeleteMapping("/students/{id}")
  @ResponseStatus(HttpStatus.OK)
  public void deleteStudent(
      @PathVariable Long id) {
    repository.deleteById(id);
  }

  private Student toStudent(StudentDto dto) {
    var student = new Student();

    var school = new School();
    school.setId(dto.schoolId());

    student.setFirstname(dto.firstname());
    student.setLastname(dto.lastname());
    student.setEmail(dto.email());
    student.setSchool(school);
    return student;
  }

  private StudentResponseDto toStudentDto(Student student) {
    return new StudentResponseDto(
        student.getFirstname(),
        student.getLastname(), 
        student.getEmail());
  }
}
