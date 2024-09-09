package org.example.reactiveweb.sec02.repository;

import org.example.reactiveweb.sec02.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.math.BigDecimal;

@Repository
public interface ProductRepository extends ReactiveCrudRepository<Product, Integer> {

    Flux<Product> findByPriceBetween(Long low, Long high);

    Flux<Product> findBy(Pageable pageable);
}
