package com.backend.student;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
//@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
//@SuperBuilder
//public class FileNotification extends BaseEntity {
public class FileNotification {
  private String type;

  private String filename;
  private Long size;

  private Notification notification;
}
