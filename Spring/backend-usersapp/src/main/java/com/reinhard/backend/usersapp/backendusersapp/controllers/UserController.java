package com.reinhard.backend.usersapp.backendusersapp.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.reinhard.backend.usersapp.backendusersapp.models.UserRequest;
import com.reinhard.backend.usersapp.backendusersapp.models.dto.UserDto;
import com.reinhard.backend.usersapp.backendusersapp.models.entities.User;
import com.reinhard.backend.usersapp.backendusersapp.services.IUserService;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/users")
// @CrossOrigin(origins="localhost:5173")
@CrossOrigin(originPatterns = "*")
public class UserController {
  
  @Autowired
  private IUserService service;

  // ruta por defecto al acceder a /users
  @GetMapping
  public List<UserDto> list(){
    return service.findAll();
  }

  // @GetMapping("/{id}")
  // public User show(@PathVariable(name = "id") Long id){
  //   return service.findById(id).orElseThrow();
  // }

  @GetMapping("/{id}")
  public ResponseEntity<?> show(@PathVariable(name = "id") Long id){
    Optional<UserDto> userOptional = service.findById(id);
    if(userOptional.isPresent()){
      return ResponseEntity.ok(userOptional.get());
    }else{
      return ResponseEntity.notFound().build();
    }
  }

  // @PostMapping
  // @ResponseStatus(HttpStatus.CREATED)
  // public User create(@RequestBody User user){
  //   return service.save(user);
  // }

  @PostMapping
  public ResponseEntity<?> create(@Valid @RequestBody User user, BindingResult result){
    if(result.hasErrors()) return validation(result);
    return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user));
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> update(@Valid @RequestBody UserRequest user, BindingResult result, @PathVariable Long id){
    if(result.hasErrors()) return validation(result);
    
    var o = service.update(user, id);
    if(o.isPresent()) return ResponseEntity.status(HttpStatus.CREATED).body(o.orElseThrow());
    return ResponseEntity.notFound().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> remove(@PathVariable Long id){
    var op = service.findById(id);
    if(op.isPresent()){
      service.remove(id);
      return ResponseEntity.noContent().build(); // 204
    }
    return ResponseEntity.notFound().build();
  }

  private ResponseEntity<?> validation(BindingResult result) {
    Map<String, String> errors = new HashMap<>();
    result.getFieldErrors().forEach((err) -> {
      errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
    });
    return ResponseEntity.badRequest().body(errors);
  }
}
