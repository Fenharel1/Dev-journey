package com.backend.student;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.backend.core", "com.backend.student"})
public class StudentApplication {

  public static void main(String[] args) {
    SpringApplication.run(StudentApplication.class, args);
  }

}
