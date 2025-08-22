package com.portfolio.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.entities.Holding;
import com.portfolio.entities.HoldingHistory;
import com.portfolio.entities.Stock;
import com.portfolio.entities.StockHistory;
import com.portfolio.repositories.*;
import org.springframework.stereotype.Service;
import io.github.cdimascio.dotenv.Dotenv;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final StockRepository stockRepository;
    private final HttpClient httpClient;
    private final HoldingRepository holdingRepository;
    private final HoldingHistoryRepository holdingHistoryRepository;
    private final StockHistoryRepository stockHistoryRepository;

    Dotenv dotenv = Dotenv.load();

    private final String apiKey = dotenv.get("API_KEY");

    public PortfolioService(PortfolioRepository portfolioRepository, StockRepository stockRepository, HoldingRepository holdingRepository, HoldingHistoryRepository holdingHistoryRepository, StockHistoryRepository stockHistoryRepository) {
        this.portfolioRepository = portfolioRepository;
        this.stockRepository = stockRepository;
        this.holdingRepository = holdingRepository;
        this.holdingHistoryRepository = holdingHistoryRepository;
        this.stockHistoryRepository = stockHistoryRepository;
        this.httpClient = HttpClient.newHttpClient();
    }

    public List<Stock> getAllStock(){
        return this.stockRepository.findAll();
    }

    public Stock getStockByTicker(String ticker){
        return this.stockRepository.findByTicker(ticker).get();
    }

    public void loadStockSymbols() {
        try {
            String url = "https://finnhub.io/api/v1/stock/symbol?exchange=US&token="+this.apiKey;
            HttpRequest request = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create(url))
                    .header("Accept", "application/json")
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response.body());
            for (int i = 0; i < Math.min(30, root.size()); i++) {
                JsonNode node = root.get(i);
                String ticker = node.get("symbol").asText();
                String urlPrice = "https://finnhub.io/api/v1/quote?symbol=" + ticker + "&token="+this.apiKey;
                HttpRequest requestPrice = HttpRequest.newBuilder()
                        .GET()
                        .uri(URI.create(urlPrice))
                        .header("Accept", "application/json")
                        .build();
                HttpResponse<String> responsePrice = HttpClient.newHttpClient().send(requestPrice, HttpResponse.BodyHandlers.ofString());
                JsonNode rootPrice = objectMapper.readTree(responsePrice.body());
                //c is price in API documentation
                String price = rootPrice.get("c").asText();

                if (Double.parseDouble(price)>1){
                    String name = node.get("description").asText();
                    if (stockRepository.findByTicker(ticker).isEmpty()) {
                        Stock stock = new Stock();
                        stock.setTicker(ticker);
                        stock.setName(name);
                        stockRepository.save(stock);
                    }
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void loadPricePerSymbol() throws IOException, InterruptedException {
        for (Stock stock : stockRepository.findAll()) {
            String url = "https://finnhub.io/api/v1/quote?symbol=" + stock.getTicker() + "&token="+this.apiKey;
            HttpRequest request = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create(url))
                    .header("Accept", "application/json")
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response.body());
            //c is price in API documentation
            String price = root.get("c").asText();
            BigDecimal newPrice = new BigDecimal(price);
            if (newPrice.compareTo(stock.getPrice()) != 0) {
                stock.setPrice(newPrice);
                stockRepository.save(stock);
                saveStockToHistory(stock);
            }

        }
    }


    public List<Holding> getAllHoldings(){
        return this.holdingRepository.findAll();
    }

    public List<Holding> getHoldingByTicker(String ticker){
        return this.holdingRepository.findByStock_Ticker(ticker);
    }

    public void addHolding(String ticker, String quantity) {
        Holding holding = new Holding();
        Stock stock = stockRepository.findByTicker(ticker).get();
        holding.setStock(stock);
        holding.setQuantity(new BigDecimal(quantity));
        holding.setPrice(stock.getPrice());
        holding.setTimestamp(LocalDateTime.now());

        holdingRepository.save(holding);
        saveHoldingToHistory(holding);

    }

    public void removeHolding(String id) {
        holdingRepository.delete(holdingRepository.findById(Long.parseLong(id)).orElse(null));
    }

    public void updateHolding(String id, String quantity) {
        Holding holding = this.holdingRepository.findById(Long.parseLong(id)).orElse(null);
        if (holding != null) {
            holding.setQuantity(new BigDecimal(quantity));
            holding.setTimestamp(LocalDateTime.now());
            holdingRepository.save(holding);
            this.saveHoldingToHistory(holding);
        }


    }
    public void saveHoldingToHistory(Holding holding) {
        HoldingHistory holdingHistory = new HoldingHistory();
        holdingHistory.setStock(holding.getStock());
        holdingHistory.setQuantity(holding.getQuantity());
        holdingHistory.setPrice(holding.getPrice());
        holdingHistory.setTimestamp(holding.getTimestamp());
        holdingHistory.setTimestampHistory(LocalDateTime.now());
        holdingHistoryRepository.save(holdingHistory);
    }


    public void saveStockToHistory(Stock stock) {
        StockHistory stockHistory = new StockHistory();
        stockHistory.setName(stock.getName());
        stockHistory.setTicker(stock.getTicker());
        stockHistory.setPrice(stock.getPrice());
        stockHistory.setTimestampHistory(LocalDateTime.now());
        stockHistoryRepository.save(stockHistory);
    }


}
