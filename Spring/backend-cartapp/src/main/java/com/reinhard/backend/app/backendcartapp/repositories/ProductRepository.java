package com.reinhard.backend.app.backendcartapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.reinhard.backend.app.backendcartapp.models.entities.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}
