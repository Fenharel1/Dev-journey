package com.ada.springcourse;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
public class FirstController {

  @GetMapping("/hello")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public String sayHello() {
    return "Hello from my first spring controller"; 
  }

  @PostMapping("/post")
  public String post( 
    @RequestBody String message
  ) {
    return "Return accepted and mesage is " + message;
  }
  
  @PostMapping("/post-order")
  public String post(@RequestBody Order order) {
    return "Return accepted and mesage is " + order.toString();
  }
  
  @PostMapping("/post-record")
  public String post(@RequestBody OrderRecord order) {
    return "Return accepted and mesage is " + order.toString();
  }
  
  // localhost:8080/hello/reinhard
  @GetMapping("/hello/{user-name}")
  public String pathVar(@PathVariable("user-name") String username) {
    return "my value = " + username;
  }
  
  // localhost:8080/hello?param_name=paramValue&param_name2=value2
  @GetMapping("/hello2")
  public String paramVar(
    @RequestParam("user-name") String username,
    @RequestParam("user-lastname") String lastname) {
    return "my value = " + username + " " + lastname;
  }
}
