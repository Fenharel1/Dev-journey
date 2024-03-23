package com.backend.springjpa2.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Course extends BaseEntity {

  private String name;
  private String desription;

  @ManyToMany
  @JoinTable(
    name = "authorsCourses",
    joinColumns = {
      @JoinColumn(name = "courseId") // will hold the info of the primary key of the owner of relationship 
    },
    inverseJoinColumns = {
      @JoinColumn(name = "authorId")
    }
  )
  private List<Author> authors;

  @OneToMany(mappedBy = "course")
  private List<Section> sections;
}
