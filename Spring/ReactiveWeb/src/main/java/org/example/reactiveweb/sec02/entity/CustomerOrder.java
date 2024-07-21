package org.example.reactiveweb.sec02.entity;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;
import java.util.UUID;

@Data
@Table("customer_order")
public class CustomerOrder {
    private UUID order_id;
    private Integer customer_id;
    private Integer product_id;
    private Integer amount;
    private Instant order_date;
}