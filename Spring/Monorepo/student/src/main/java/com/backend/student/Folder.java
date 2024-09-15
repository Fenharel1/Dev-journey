package com.backend.student;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
//@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
//@SuperBuilder
//public class Folder extends BaseEntity {
public class Folder  {
  private String name;
  private String type;
  private Long userId;
  private List<Notification> notifications;
}
