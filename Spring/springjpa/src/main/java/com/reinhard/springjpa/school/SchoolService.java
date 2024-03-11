package com.reinhard.springjpa.school;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class SchoolService {

  private final SchoolRepository repository;
  private final SchoolMapper schoolMapper;
 
  public SchoolService(SchoolRepository repository, SchoolMapper schoolMapper) {
    this.repository = repository;
    this.schoolMapper = schoolMapper;
  }

  public SchoolDto create(SchoolDto dto){
    repository.save(schoolMapper.toSchool(dto));
    return dto;
  }

  public List<SchoolDto> getSchools(){
    return repository.findAll().stream().map(schoolMapper::toSchoolDto).toList();
  }

}
