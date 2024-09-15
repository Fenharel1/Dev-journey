package com.backend.student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.backend.core.BaseEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
  private String name;
  private String lastname;
  private int age;
}
