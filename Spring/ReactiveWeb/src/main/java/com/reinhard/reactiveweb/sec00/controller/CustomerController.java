package com.reinhard.reactiveweb.sec00.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerRepository repository;

    @GetMapping
    public Flux<Customer> getCustomers() {
        return repository.findAll()
                .delayElements(Duration.ofMillis(1000))
                .map(c -> { c.setName("Modified " + c.getName()); return c; })
                ;
    }
}