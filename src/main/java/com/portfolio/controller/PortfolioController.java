package com.portfolio.controller;

import com.portfolio.service.PortfolioService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PortfolioController {
    private PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }
//     Deprecated
//    @GetMapping("api/symbols")
//    public String getSymbols(){
//        return this.portfolioService.loadStockSymbols();
//    }
}
