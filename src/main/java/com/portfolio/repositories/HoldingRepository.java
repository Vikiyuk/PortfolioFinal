package com.portfolio.repositories;

import com.portfolio.entities.Holding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoldingRepository extends JpaRepository<Holding, Long> {
    public List<Holding> findByStock_Ticker(String ticker);
}
