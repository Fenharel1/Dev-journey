package com.reinhard.chatmany;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
public class ResourcesConfig implements WebMvcConfigurer {

  // @Override
  // public void addResourceHandlers(ResourceHandlerRegistry registry) {
  //   registry.addResourceHandler("./css/**","./js/**")
  //     .addResourceLocations("classpath:/static/css/","classpath:/static/js");
  // }

}
