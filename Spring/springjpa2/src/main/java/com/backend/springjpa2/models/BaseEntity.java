package com.backend.springjpa2.models;

import java.time.LocalDateTime;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@MappedSuperclass // this is for abstract class which will inherit its attributes to all its subclasses
public class BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; // default value of Integer is null whereas int is 0
  private LocalDateTime createdAt;
  private LocalDateTime lastModifiedAt;
  private String createdBy;
  private String lastModifiedBy;
}