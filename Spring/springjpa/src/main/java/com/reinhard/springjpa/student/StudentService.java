package com.reinhard.springjpa.student;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class StudentService {
  private final StudentRepository repository;
  private final StudentMapper studentMapper;

  public StudentService(StudentRepository repository, StudentMapper studentMapper) {
    this.repository = repository;
    this.studentMapper = studentMapper;
  }

  public StudentResponseDto saveStudent(StudentDto dto){
    return studentMapper.toStudentResponseDto(
      repository.save(studentMapper.toStudent(dto))
      );
  }

  public List<StudentResponseDto> getStudents(){
    return studentMapper.toListStudentResponseDtos(
     repository.findAll());
  }

  public StudentResponseDto getStudentById(Long id){
    var student = repository.findById(id).orElse(null);
    return studentMapper.toStudentResponseDto(student); 
  }

  public void deleteStudent(Long id){
    repository.deleteById(id);
  }

  public List<StudentResponseDto> getStudentsByWord(String word){
    return studentMapper.toListStudentResponseDtos(repository.findAllByFirstnameContaining(word));
  }
}
