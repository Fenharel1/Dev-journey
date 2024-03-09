package com.ada.springcourse;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

@Configuration
public class ApplicationConfig {
  @Bean
  // @Qualifier("bean1")
  public MyComponent myFirstBean() {
    return new MyComponent("first bean");
  }

  @Bean
  @Profile("test")
  // @Qualifier("bean2")
  public MyComponent mySecondBean() {
    return new MyComponent("second bean");
  }

  @Bean
  @Primary
  public MyComponent myThirdBean() {
    return new MyComponent("third bean");
  }
}
