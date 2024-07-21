package org.example.reactiveweb.sec03.exceptions;

import org.apache.logging.log4j.message.Message;

public class CustomerNotFoundException extends RuntimeException {

    private static final String Message = "Customer with id=%d was not found";

    public CustomerNotFoundException(Integer id) {
        super(Message.formatted(id));
    }

}
