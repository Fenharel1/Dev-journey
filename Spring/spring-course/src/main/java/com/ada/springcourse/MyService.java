package com.ada.springcourse;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

@Service
@PropertySource("classpath:custom.properties")
public class MyService {

  // @Autowired
  // @Qualifier("myThirdBean")
  private final MyComponent myComponent;

  @Value("${my.prop}")
  private String customPropFromExt;

  @Value("${my.custom.property}")
  private String customProp;

  public String getCustomProp() {
    return customProp;
  }

  public String getCustomPropFromExt() {
    return customPropFromExt;
  }

  public MyService(@Qualifier("myFirstBean") MyComponent myComponent) {
    this.myComponent = myComponent;
  }

  public String tellStory() {
    return "The dependency is saying: " + myComponent.sayHello();
  }

}
