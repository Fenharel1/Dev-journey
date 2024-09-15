package com.reinhard.chatmany.config;

import com.reinhard.chatmany.chat.ChatMessage;
import com.reinhard.chatmany.chat.MessageType;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MyController {

  private final SimpMessageSendingOperations messageTemplate;

  @GetMapping("/send")
  public String send(){
    var message = ChatMessage.builder()
        .type(MessageType.CHAT)
        .sender("System")
        .content("Hola mundooo")
        .build();

    messageTemplate.convertAndSend("/topic/public",message);
    return "sent";
  }
}
