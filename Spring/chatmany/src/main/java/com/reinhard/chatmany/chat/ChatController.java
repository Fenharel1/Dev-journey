package com.reinhard.chatmany.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

  // each time we receive a payload it will be queued to the topic/public
  @MessageMapping("/chat.sendMessage") // tells what is the url I want to use to invoke this function
  @SendTo("/topic/public") // which topic or queue we want to send
  public ChatMessage sendMessage(
    // payload is the request body for ws
    @Payload ChatMessage chatMessage
  ){
    return chatMessage;
  }

  @MessageMapping("/chat.addUser") // tells what is the url I want to use to invoke this function
  @SendTo("/topic/public") // which topic or queue we want to send
  public ChatMessage addUser(
    @Payload ChatMessage chatMessage,
    SimpMessageHeaderAccessor headerAccessor
  ){
    // add username in websocket session
    headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
    return chatMessage;
  }
}
