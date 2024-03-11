package com.reinhard.springjpa;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Student {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String firstname;

  private String lastname;

  @Column(unique = true)
  private String email;

  private int age;

  @OneToOne(mappedBy = "student", cascade = CascadeType.ALL)
  private StudentProfile studentProfile;

  public StudentProfile getStudentProfile() {
    return studentProfile;
  }

  public void setStudentProfile(StudentProfile studentProfile) {
    this.studentProfile = studentProfile;
  }

  public School getSchool() {
    return school;
  }

  public void setSchool(School school) {
    this.school = school;
  }

  @ManyToOne
  @JoinColumn(name = "school_id")
  @JsonBackReference
  private School school;

  public Student(String firstname, String lastname, String email, int age) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.age = age;
  }

  public Student() {

  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

}
