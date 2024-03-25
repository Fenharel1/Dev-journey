package com.backend.springjpa2.models;

import java.util.List;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.NamedQuery;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@NamedQuery(
  name = "Author.findByNamedQuery",
  query = "select a from Author a where a.age >= :age"
)
public class Author extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; // default value of Integer is null whereas int is 0

  @Column(
    length = 35
  )
  private String firstname;
  private String lastname;

  @Column(
    unique = true,
    nullable = false
  )
  private String email;
  private int age;

  @ManyToMany(mappedBy = "authors") // the column of the owner
  private List<Course> courses;
}
