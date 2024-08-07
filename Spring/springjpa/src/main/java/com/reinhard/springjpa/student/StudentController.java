package com.reinhard.springjpa.student;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
public class StudentController {

  private final StudentService studentService;
  
  public StudentController(StudentService studentService){
    this.studentService = studentService;
  }

  @PostMapping("/students")
  public StudentResponseDto createStudent(@Valid @RequestBody StudentDto studentDto) {
    return studentService.saveStudent(studentDto); 
  }

  @GetMapping("/students")
  public List<StudentResponseDto> getStudents() {
    return studentService.getStudents();
  }

  @GetMapping("/students/{id}")
  public StudentResponseDto getStudents(@PathVariable Long id) {
    return studentService.getStudentById(id);
  }

  @GetMapping("/students/search/{student-name}")
  public List<StudentResponseDto> getStudentsByWord(
      @PathVariable("student-name") String name) {
    return studentService.getStudentsByWord(name);
  }

  @DeleteMapping("/students/{id}")
  @ResponseStatus(HttpStatus.OK)
  public void deleteStudent( @PathVariable Long id) {
    studentService.deleteStudent(id);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<?> handleMethodArgumentNotValid(MethodArgumentNotValidException exp){
    var errors = new HashMap<String, String>();
    exp.getBindingResult().getAllErrors().forEach((error)->{
      var fieldName = ((FieldError)error).getField();
      var errorMessage = error.getDefaultMessage();
      errors.put(fieldName,errorMessage);
    });
    return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
  } 
}
