package com.backend.springjpa2;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.backend.springjpa2.models.Author;
import com.backend.springjpa2.models.Video;
import com.backend.springjpa2.repositories.AuthorRepository;
import com.backend.springjpa2.repositories.VideoRepository;
import com.github.javafaker.Faker;

import jakarta.transaction.Transactional;


@SpringBootApplication
public class Springjpa2Application {

	public static void main(String[] args) {
		SpringApplication.run(Springjpa2Application.class, args);
	}

	@Bean
	@Transactional
	public CommandLineRunner commandLineRunner(
			AuthorRepository authorRepo,
			VideoRepository videoRepo) {
		return args -> {
			// for (int i = 0; i < 50; i++) {
			// Faker faker = new Faker();
			// var author = Author.builder()
			// .firstname(faker.name().firstName())
			// .lastname(faker.name().lastName())
			// .email(faker.name().firstName()+i+"@gmail")
			// .age(faker.number().numberBetween(16, 56))
			// .build();
			// authorRepo.save(author);
			// }
			// var video = Video.builder()
			// .name("machupicchu")
			// .length(5)
			// .build();
			// videoRepo.save(video);
			// Embedded types also so important
			var res = authorRepo.findAllByFirstname("Lucienne");
			System.out.println("================ Result ============");
			// System.out.println(res.toString());
			if (res instanceof List) {
				res.forEach(a -> {
					System.out.println(a.getFirstname());
				});
			} else {
				// System.out.println(res.getFirstname());
			}
			System.out.println("================ EOF ============");
		};
	}

}
