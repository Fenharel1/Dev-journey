package com.backend.springjpa2;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.backend.springjpa2.models.Author;
import com.backend.springjpa2.repositories.AuthorRepository;

@SpringBootApplication
public class Springjpa2Application {

	public static void main(String[] args) {
		SpringApplication.run(Springjpa2Application.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
		AuthorRepository authorRepo
	){
		return args -> {
			var author = Author.builder()
			.firstname("Reinhard")
			.lastname("conde")
			.email("rei@gmai")
			.age(23)
			.build();
		
			authorRepo.save(author);
		};
	}

}
