package org.example.reactiveweb.sec03.exceptions;

import org.example.reactiveweb.sec03.entity.Customer;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.function.UnaryOperator;

public class ApplicationException {

    public static <T> Mono<T> customerNotFound(Integer id){
        return Mono.error(new CustomerNotFoundException(id));
    }

    public static <T> Mono<T> missingName(){
        return Mono.error(new InvalidInputException("Nombre es requerido"));
    }

    public static <T> Mono<T> missingEmail(){
        return Mono.error(new InvalidInputException("Valid email is required"));
    }

}
