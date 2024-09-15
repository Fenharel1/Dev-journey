package com.backend.student.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class NotificationDto {
  private Long id;
  private String notificationNumber;
  private String status;
  private String caseNumber;
  private LocalDateTime sentAt;
  private String sender;
  private String subject;
  private List<FileDto> files;
  private String foldername;

  public static class FileDto {
    public String filename;
    public Long fileId;
  }
}
