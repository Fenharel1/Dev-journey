package com.reinhard.backend.app.backendcartapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.reinhard.backend.app.backendcartapp.models.entities.Product;
import com.reinhard.backend.app.backendcartapp.services.ProductService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@CrossOrigin(origins={"http://localhost:5173", "http://192.168.1.10:5173"})
@RequestMapping("/api")
public class ProductController {

  @Autowired
  private ProductService service;

  @GetMapping("/products")
  public List<Product> list() {
    return service.findAll();
  }
}
