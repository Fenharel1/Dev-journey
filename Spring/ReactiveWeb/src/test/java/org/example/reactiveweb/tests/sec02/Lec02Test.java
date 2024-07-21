package org.example.reactiveweb.tests.sec02;

import org.example.reactiveweb.sec02.repository.ProductRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import reactor.test.StepVerifier;

public class Lec02Test extends AbstractTest {

    private static final Logger log = LoggerFactory.getLogger(Lec02Test.class);
    @Autowired
    private ProductRepository repository;

    @Test
    public void findByPriceRange() {
        this.repository.findByPriceBetween(400L,1000L)
                .doOnNext(p -> log.info(p.toString()))
                .as(StepVerifier::create)
                .expectNextCount(4)
                // .assertNext(p -> Assertions.assertTrue(400L <= p.getPrice() && p.getPrice() <= 1000L))
                .expectComplete()
                .verify();
    }

    @Test
    public void findByPageable() {
        this.repository.findBy(
                PageRequest.of(0, 3)
                        .withSort(Sort.by("price").ascending()))
                .doOnNext(p -> log.info(p.toString()))
                .as(StepVerifier::create)
                .assertNext(p -> Assertions.assertEquals(200, p.getPrice()))
                .assertNext(p -> Assertions.assertEquals(250, p.getPrice()))
                .assertNext(p -> Assertions.assertEquals(300, p.getPrice()))
                .expectComplete()
                .verify();
    }
}