package com.reinhard.springjpa.school;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class SchoolController {

  private final SchoolService schoolService;

  public SchoolController(SchoolService schoolService) {
    this.schoolService = schoolService;
  }

  @PostMapping("/schools")
  public SchoolDto create(@RequestBody SchoolDto schoolDto) {
    return schoolService.create(schoolDto);
  }
  
  @GetMapping("/schools")
  public List<SchoolDto> getSchools() {
    return schoolService.getSchools();
  }

  
}
