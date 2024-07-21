package org.example.reactiveweb.sec03.controller;

import lombok.RequiredArgsConstructor;
import org.example.reactiveweb.sec03.entity.Customer;
import org.example.reactiveweb.sec03.exceptions.ApplicationException;
import org.example.reactiveweb.sec03.service.CustomerService;
import org.example.reactiveweb.sec03.validator.RequestValidator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/customers2")
@RequiredArgsConstructor
public class CustomerController2 {

    private final CustomerService customerService;

    @GetMapping
    public Flux<Customer> allCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public Mono<Customer> getCustomer(@PathVariable Integer id) {
        return customerService.getCustomerById(id)
                .switchIfEmpty(ApplicationException.customerNotFound(id));
    }

    @PostMapping
    public Mono<Customer> createCustomer(@RequestBody Mono<Customer> customer) {
        return customer.transform(RequestValidator.validate())
                .as(customerService::saveCustomer);
    }

    @PutMapping("/{id}")
    public Mono<Customer> updateCustomer(@PathVariable Integer id, @RequestBody Mono<Customer> customer) {
        return  customer.transform(RequestValidator.validate())
                .as(c -> customerService.updateCustomer(id, c))
                .switchIfEmpty(ApplicationException.customerNotFound(id));
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteCustomer(@PathVariable Integer id) {
        return customerService.deleteCustomerById(id)
                .filter(b -> b)
                .switchIfEmpty(ApplicationException.customerNotFound(id))
                .then();
    }

    @GetMapping("/page")
    public Mono<Page<Customer>> getCustomers(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "3") Integer size
    ) {
        return customerService.getAllCustomers(PageRequest.of(page,size));
    }
}
