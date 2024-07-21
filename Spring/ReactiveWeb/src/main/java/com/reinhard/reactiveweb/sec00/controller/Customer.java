package com.reinhard.reactiveweb.sec00.controller;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table(name = "CUSTOMER")
public class Customer {
    @Id
    private Integer id;
    private String name;
    private String email;
}
