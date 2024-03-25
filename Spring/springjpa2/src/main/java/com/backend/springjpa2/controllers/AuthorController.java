package com.backend.springjpa2.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("api/author")
public class AuthorController {

  private final AuthorRe

  @GetMapping("")
  public List<Author> getAuthors() {
    
  }
}
