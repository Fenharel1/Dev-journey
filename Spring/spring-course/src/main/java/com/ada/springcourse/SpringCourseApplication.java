package com.ada.springcourse;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringCourseApplication {

	public static void main(String[] args) {
		var app = new SpringApplication(SpringCourseApplication.class);
		// var ctx = SpringApplication.run(SpringCourseApplication.class, args);
		app.setDefaultProperties(Collections.singletonMap("spring.profiles.active", "dev"));
		var ctx = app.run(args);

		// MyComponent mycomponent = (MyComponent)ctx.getBean(MyComponent.class);
	}

}
