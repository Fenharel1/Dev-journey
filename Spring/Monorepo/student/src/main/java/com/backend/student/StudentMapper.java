package com.backend.student;

import com.backend.student.dto.NotificationDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudentMapper {

//  @BeanMapping(builder = @Builder( disableBuilder = true ))
//  StudentDto toStudentDto(Student student);
//
//  @Mapping(source = "folder.name", target = "foldername")
//  @BeanMapping(builder = @Builder( disableBuilder = true ))
//  NotificationDto toNotificationDto(Notification notification);


//  @Mapping(source = "id", target = "fileId")
//  @BeanMapping(builder = @Builder( disableBuilder = true ))
//  NotificationDto.FileDto toListFileDto(FileNotification files);
}

