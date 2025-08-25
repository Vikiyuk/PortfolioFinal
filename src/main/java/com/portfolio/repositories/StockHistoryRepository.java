package com.portfolio.repositories;

import com.portfolio.entities.StockHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StockHistoryRepository extends JpaRepository<StockHistory,Long> {
    List<StockHistory> findByTimestampHistoryBetween(LocalDateTime fourteenDaysAgo, LocalDateTime now);
}
