package org.example.reactiveweb.sec03.service;

import lombok.RequiredArgsConstructor;
import org.example.reactiveweb.sec03.entity.Customer;
import org.example.reactiveweb.sec03.repository.CustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public Flux<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Mono<Customer> getCustomerById(Integer id) {
        return customerRepository.findById(id);
    }

    public Mono<Customer> saveCustomer(Mono<Customer> customer) {
        return customer
            .flatMap(customerRepository::save);
    }

    public Mono<Customer> updateCustomer(Integer id, Mono<Customer> customer) {
        return customerRepository.findById(id)
                .flatMap( c -> customer )
                .doOnNext( c -> c.setId(id))
                .flatMap(customerRepository::save) ;
    }

    public Mono<Boolean> deleteCustomerById(Integer id) {
        return customerRepository.deleteCustomerById(id);
    }

    public Mono<Page<Customer>> getAllCustomers(PageRequest pageRequest) {
        return customerRepository.findBy(pageRequest)
                .collectList()
                .zipWith(customerRepository.count())
                .map(t -> new PageImpl<>( t.getT1() , pageRequest, t.getT2() )) ;
    }
}
