package com.portfolio.controller;

import com.portfolio.service.PortfolioService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;

@Controller
public class PortfolioController {
    private PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }
//     Deprecated
//    @GetMapping("api/symbols")
//    public void getSymbols(){
//        this.portfolioService.loadStockSymbols();
//    }
//
    @GetMapping("api/load")
    public void getPrice() throws IOException, InterruptedException {
        this.portfolioService.loadPricePerSymbol();
    }

}
