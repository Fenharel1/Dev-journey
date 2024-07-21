package org.example.reactiveweb.sec03.validator;

import org.example.reactiveweb.sec03.entity.Customer;
import org.example.reactiveweb.sec03.exceptions.ApplicationException;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.function.Predicate;
import java.util.function.UnaryOperator;

public class RequestValidator {

    public static UnaryOperator<Mono<Customer>> validate(){
        return mono -> mono.filter(hasName())
                .switchIfEmpty(ApplicationException.missingName())
                .filter(hasEmail())
                .switchIfEmpty(ApplicationException.missingEmail());
    }

    private static Predicate<Customer> hasName(){
        return c -> Objects.nonNull(c.getName());
    }

    private static Predicate<Customer> hasEmail(){
        return c -> Objects.nonNull(c.getEmail());
    }
}
