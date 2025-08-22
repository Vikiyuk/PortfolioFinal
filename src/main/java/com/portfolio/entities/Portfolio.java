package com.portfolio.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Portfolio {
    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "portfolio")
    private List<Holding> holdings = new ArrayList<>();

}
