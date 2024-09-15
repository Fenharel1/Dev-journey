package com.backend.core;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
//@SuperBuilder
public abstract class BaseEntity {
  protected Long id;
}
