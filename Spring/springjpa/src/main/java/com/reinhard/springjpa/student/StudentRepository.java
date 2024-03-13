package com.reinhard.springjpa.student;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long > {

  List<Student> findAllByFirstnameContaining(String p);
}