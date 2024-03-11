package com.reinhard.springjpa;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class SchoolController {

  private final SchoolRepository repository;

  public SchoolController(SchoolRepository repository) {
    this.repository = repository;
  }

  @PostMapping("/schools")
  public SchoolDto create(@RequestBody SchoolDto schoolDto) {
      repository.save(toSchool(schoolDto));
      return schoolDto;
  }
  
  @GetMapping("/schools")
  public List<SchoolDto> getSchools() {
      return repository.findAll().stream().map(this::toDto).collect(Collectors.toList());
  }

  private School toSchool(SchoolDto dto){
    return new School(dto.name());
  }

  private SchoolDto toDto(School school){
    return new SchoolDto(school.getName());
  }
}
