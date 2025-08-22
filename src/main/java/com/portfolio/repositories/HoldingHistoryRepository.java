package com.portfolio.repositories;

import com.portfolio.entities.HoldingHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HoldingHistoryRepository extends JpaRepository<HoldingHistory,Long> {
}
