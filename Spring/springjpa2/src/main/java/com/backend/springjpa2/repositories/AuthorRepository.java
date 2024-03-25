package com.backend.springjpa2.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.backend.springjpa2.models.Author;

public interface AuthorRepository extends JpaRepository<Author, Integer> {
  // !!! USE CTRL + SPACE

  @Modifying // for update queries
  @Query("update Author a set a.age = :age where a.id = :id")
  int updateAuthor(int age, int id);

  List<Author> findAllByFirstname(String word);


  List<Author> findAllByFirstnameIgnoreCase(String word);

  // select * from author where first_name like '%al%'
  List<Author> findAllByFirstnameContainingIgnoreCase(String word);

  // select * from author where first_name like 'al%'
  List<Author> findAllByFirstnameStartsWithIgnoreCase(String word);

  // select * from author where first_name like '%al'
  List<Author> findAllByFirstnameEndsWithIgnoreCase(String word);

  // select * from author where first_name in ('rei','maria','lucia')
  List<Author> findAllByFirstnameInIgnoreCase(String... fn);

}
