package com.backend.springjpa2.models;

import org.hibernate.annotations.Polymorphism;
import org.hibernate.annotations.PolymorphismType;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
// @DiscriminatorValue("V") --> single table
// @PrimaryKeyJoinColumn(name = "video_id") --> joined strategy
// @Polymorphism(type = PolymorphismType.EXPLICIT) --> table per class, to exclude this class when querie the resource table 
public class Video extends Resource {
  private int length;
}
