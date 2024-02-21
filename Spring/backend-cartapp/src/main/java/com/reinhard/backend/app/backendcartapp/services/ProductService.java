package com.reinhard.backend.app.backendcartapp.services;

import java.util.List;

import com.reinhard.backend.app.backendcartapp.models.entities.Product;

public interface ProductService {
  List<Product> findAll();
}
