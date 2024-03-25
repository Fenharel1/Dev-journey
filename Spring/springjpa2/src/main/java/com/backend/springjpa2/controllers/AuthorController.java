package com.backend.springjpa2.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.backend.springjpa2.models.Author;
import com.backend.springjpa2.repositories.AuthorRepository;
import lombok.RequiredArgsConstructor;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("api/author")
@RequiredArgsConstructor
public class AuthorController {

  private final AuthorRepository authorRepository;

  @GetMapping("")
  public List<Author> getAuthors() {
    return authorRepository.findAllByFirstname("Lucienne");
  }
}
