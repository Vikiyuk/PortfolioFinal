package com.portfolio.controller;

import com.portfolio.entities.Holding;
import com.portfolio.entities.Stock;
import com.portfolio.service.PortfolioService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class PortfolioController {
    private PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }
     //Deprecated
    @GetMapping("api/symbols")
    public void getSymbols(){
        this.portfolioService.loadStockSymbols();
    }

    @GetMapping("api/load")
    public void getPrice() throws IOException, InterruptedException {
        this.portfolioService.loadPricePerSymbol();
    }

    @GetMapping("api/stock")
    public List<Stock> getStock() throws IOException, InterruptedException {
        return this.portfolioService.getAllStock();
    }

    @GetMapping("api/holdings")
    public List<Holding> getHoldings() throws IOException, InterruptedException {
        return this.portfolioService.getAllHoldings();
    }

    @PostMapping("api/holdings")
    public void addHolding(@RequestParam String ticker,@RequestParam String quantity) throws IOException, InterruptedException {
        portfolioService.addHolding(ticker, quantity);
    }


}
