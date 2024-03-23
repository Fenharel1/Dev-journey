package com.backend.springjpa2.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@Entity
public class Lecture extends BaseEntity {

  private String name;

  @ManyToOne
  @JoinColumn(name = "sectionId")
  private Section section;

  @OneToOne
  @JoinColumn(name = "resourceId")
  private Resource resource;
}
