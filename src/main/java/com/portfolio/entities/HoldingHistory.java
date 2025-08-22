package com.portfolio.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class HoldingHistory {
    @Id
    @GeneratedValue
    private Long id;

//    @ManyToOne(optional = false)
//    @JoinColumn(name = "portfolio_id")
//    private Portfolio portfolio;

    @ManyToOne(optional = false)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    private LocalDateTime timestamp;




    private LocalDateTime timestampHistory;

    @Column(nullable = false, precision = 19, scale = 4)
    private java.math.BigDecimal quantity;

    @Column(nullable = false, precision = 19, scale = 4)
    private java.math.BigDecimal price;

    public LocalDateTime getTimestampHistory() {
        return timestampHistory;
    }

    public void setTimestampHistory(LocalDateTime timestampHistory) {
        this.timestampHistory = timestampHistory;
    }
}
