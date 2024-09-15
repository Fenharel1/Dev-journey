package com.reinhard.jooq.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.ToString;

@Entity
@ToString
public class Student {
  @Id
  public Long id;

  public String name;

  public String lastname;

  public Long age;
}
