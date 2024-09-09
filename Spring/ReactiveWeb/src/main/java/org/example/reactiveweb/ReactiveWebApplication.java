package org.example.reactiveweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;

@SpringBootApplication(scanBasePackages = "org.example.reactiveweb.${sec}")
@EnableR2dbcRepositories(basePackages = "org.example.reactiveweb.${sec}")
public class ReactiveWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReactiveWebApplication.class, args);
    }

}
