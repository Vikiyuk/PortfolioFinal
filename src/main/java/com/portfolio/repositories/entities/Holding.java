package com.portfolio.repositories.entities;
import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Holding {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    @ManyToOne(optional = false)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    private Date timestamp;

    @Column(nullable = false, precision = 19, scale = 4)
    private java.math.BigDecimal quantity;

    @Column(nullable = false, precision = 19, scale = 4)
    private java.math.BigDecimal price;
}
