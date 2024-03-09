package com.ada.springcourse;

public class MyComponent {

  private String myVar;

  public MyComponent(String myVar) {
    this.myVar = myVar;
  }

  public String sayHello () {
    return "Hello from my component " + myVar;
  }

}
