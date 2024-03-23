package com.backend.springjpa2.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Section extends BaseEntity {
  private String name;

  private int sectionOrder;

  @ManyToOne
  @JoinColumn(name="courseId")
  private Course course;

  @OneToMany(mappedBy = "section")
  private List<Lecture> lectures;
}
