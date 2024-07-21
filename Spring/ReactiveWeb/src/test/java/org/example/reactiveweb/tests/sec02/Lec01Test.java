package org.example.reactiveweb.tests.sec02;

import org.example.reactiveweb.sec02.entity.Customer;
import org.example.reactiveweb.sec02.repository.CustomerRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.test.StepVerifier;

public class Lec01Test extends AbstractTest {

    private static final Logger log = LoggerFactory.getLogger(Lec01Test.class);
    @Autowired
    private CustomerRepository repository;

    @Test
    public void findAll() {
        this.repository.findAll()
                .doOnNext(c ->  log.info(c.toString()))
                .as(StepVerifier::create)
                .expectNextCount(10)
                .expectComplete()
                .verify();
    }

    @Test
    public void findById() {
        this.repository.findById(1)
                .doOnNext(c -> log.info(c.toString()))
                .as(StepVerifier::create)
                .assertNext(c -> Assertions.assertEquals(c.getName(), "sam"))
                .expectComplete()
                .verify();
    }

    @Test
    public void findByName() {
        this.repository.findByName("jake")
                .doOnNext(c -> log.info(c.toString()))
                .as(StepVerifier::create)
                .assertNext(c -> Assertions.assertEquals(c.getEmail(), "jake@gmail.com"))
                .expectComplete()
                .verify();
    }

    @Test
    public void findByEndingWordAtEmail() {
        this.repository.findByEmailEndingWithIgnoreCase("ke@gmail.com")
                .doOnNext(c -> log.info(c.toString()))
                .as(StepVerifier::create)
                .expectNextCount(2)
                .expectComplete()
                .verify();
    }

    @Test
    public void insertAndDeleteCustomer() {
        // insert
        var customer = new Customer();
        customer.setName("marshal");
        customer.setEmail("marshal@gmail.com");
        this.repository.save(customer)
                .doOnNext(c -> log.info(c.toString()))
                .as(StepVerifier::create)
                .assertNext(c -> Assertions.assertNotNull(c.getId()))
                .expectComplete()
                .verify();

        // count
        this.repository.count().as(StepVerifier::create)
                .expectNext(11L)
                .expectComplete()
                .verify();

        // delete
        this.repository.deleteById(11)
                .then(this.repository.count())
                .as(StepVerifier::create)
                .expectNext(10L)
                .expectComplete()
                .verify();
    }

    @Test
    public void updateCustomer() {
        this.repository.findByName("ethan")
                .doOnNext(c -> c.setName("nathan"))
                .flatMap(c -> this.repository.save(c))
                .as(StepVerifier::create)
                .assertNext(c -> Assertions.assertEquals("nathan",c.getName()))
                .expectComplete()
                .verify();
    }
}
