package org.example.reactiveweb.tests.sec02;

import org.example.reactiveweb.sec02.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.example.reactiveweb.sec02.repository.CustomerOrderRepository;
import reactor.test.StepVerifier;

public class Lec03Test extends AbstractTest {

    private static final Logger log = LoggerFactory.getLogger(Lec03Test.class);

    @Autowired
    private CustomerOrderRepository repository;

    @Test
    public void productsOrderedByCustomer() {
        this.repository.getProductsOrderByCustomer("mike")
                .doOnNext(p -> log.info(p.toString()))
                .as(StepVerifier::create)
                .expectNextCount(2)
                .expectComplete()
                .verify();
    }
}
