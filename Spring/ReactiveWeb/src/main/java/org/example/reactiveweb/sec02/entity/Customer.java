package org.example.reactiveweb.sec02.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("customer")
@NoArgsConstructor
public class Customer {

    @Id
    private Integer id;
    private String name;
    private String email;
}
