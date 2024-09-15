package com.backend.student;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
//@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
//@SuperBuilder
public class Notification {
//public class Notification extends BaseEntity {

  private String status;

  private String caseNumber; // nro de expediente

  private LocalDateTime sentAt;

  private LocalDateTime readAt;

  private String sender;

  private String subject;

  private List<FileNotification> files = new ArrayList<>();

  private Long userId;

  private Folder folder;
}