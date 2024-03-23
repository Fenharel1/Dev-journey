package com.backend.springjpa2.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.springjpa2.models.Author;

public interface AuthorRepository extends JpaRepository<Author,Integer> {

}
