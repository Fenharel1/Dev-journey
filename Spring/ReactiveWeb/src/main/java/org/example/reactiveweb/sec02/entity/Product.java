package org.example.reactiveweb.sec02.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("product")
@Data
@NoArgsConstructor
public class Product {
    @Id
    private Integer id;
    private String description;
    private Long price;
}
