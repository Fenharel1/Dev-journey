package com.reinhard.jooq;

import com.querydsl.jpa.impl.JPAQueryFactory;
//import com.reinhard.jooq.models.QStudent;
//import com.reinhard.jooq.models.Student;
import jakarta.persistence.EntityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class JooqApplication {

  private static final Logger log = LoggerFactory.getLogger(JooqApplication.class);

  public static void main(String[] args) {
    SpringApplication.run(JooqApplication.class, args);
  }

  @Bean
  public JPAQueryFactory getJPAQueryFactory(EntityManager em) {
    return new JPAQueryFactory(em);
  }

  @Bean
  public CommandLineRunner commandLineRunner(JPAQueryFactory query) {
    return (args) -> {
//      var qstudent = QStudent.student;
//
//      var all = query.select(qstudent)
//        .from(qstudent)
//        .fetchFirst()
//        ;
//      System.out.println("Aqui primer: " + all.toString());
//
//      Student newstuden = new Student();
//      newstuden.id = 7L;
//      newstuden.name = "reinhard";
//      newstuden.lastname = "hola mundo";
//
//      var result = query.select(qstudent)
//        .from(qstudent)
//        .where(qstudent.age.between(12,16))
//        .orderBy(qstudent.age.asc())
//        .orderBy(qstudent.name.desc())
////        .limit(2)
////        .offset(2)
//        .fetch().stream().toList();
//
//      result.stream().forEach(s -> {
//        log.info("-> {}",s.toString());
//      });
    };
  }

}
