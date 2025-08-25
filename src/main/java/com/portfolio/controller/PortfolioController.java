package com.portfolio.controller;

import com.portfolio.dto.StockTrend;
import com.portfolio.entities.Holding;
import com.portfolio.entities.Stock;
import com.portfolio.entities.StockHistory;
import com.portfolio.service.PortfolioService;
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
    public List<Stock> getStock() {
        return this.portfolioService.getAllStock();
    }

    @GetMapping("api/holdings")
    public List<Holding> getHoldings() {
        return this.portfolioService.getAllHoldings();
    }

    @PostMapping("api/holdings")
    public void addHolding(@RequestParam String ticker,@RequestParam String quantity) {
        portfolioService.addHolding(ticker, quantity);
    }

    @PutMapping("api/holdings")
    public void updateHolding(@RequestParam String id,@RequestParam String quantity) {
        portfolioService.updateHolding(id, quantity);
    }
    @DeleteMapping("api/holdings")
    public void deleteHolding(@RequestParam String id){
        portfolioService.removeHolding(id);
    }

    @GetMapping("api/gain")
    public String getCalculatedGainLost(@RequestParam String id,@RequestParam String quantity){
        return portfolioService.calculateGainLoss(id,quantity);
    }

    @GetMapping("api/generate")
    public void generateFakeData(){
        portfolioService.generateFakeStockHistory();
    }

    @GetMapping("api/trends")
    public List<StockTrend> getTrends(){
        return portfolioService.getTrends();
    }

    @GetMapping("api/stockhistory")
    public List<StockHistory> getStockhistory(@RequestParam String ticker){
        return portfolioService.getStock14DaysHistory(ticker);
    }

}
