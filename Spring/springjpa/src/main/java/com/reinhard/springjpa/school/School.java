package com.reinhard.springjpa.school;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.reinhard.springjpa.student.Student;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class School {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  @OneToMany(
    mappedBy = "school"
  )
  @JsonManagedReference // tells hibernate that the child dont have to try to serialize the parent
  private List<Student> students;

  public List<Student> getStudents() {
    return students;
  }

  public void setStudents(List<Student> students) {
    this.students = students;
  }

  public School(String name) {
    this.name = name;
  }

  public School(){}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  
}
