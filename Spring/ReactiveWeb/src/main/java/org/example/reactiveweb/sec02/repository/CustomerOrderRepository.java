package org.example.reactiveweb.sec02.repository;

import org.example.reactiveweb.sec02.entity.CustomerOrder;
import org.example.reactiveweb.sec02.entity.Product;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.util.UUID;

@Repository
public interface CustomerOrderRepository extends ReactiveCrudRepository<CustomerOrder, UUID> {

    @Query("""
        SELECT p.*
        FROM
            customer c 
        INNER JOIN customer_order co ON c.id = co.customer_id
        INNER JOIN product p ON p.id = co.product_id
        WHERE c.name = :name
    """)
    Flux<Product> getProductsOrderByCustomer(String name);
}
