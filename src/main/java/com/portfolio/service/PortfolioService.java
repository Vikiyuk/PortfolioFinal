package com.portfolio.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.entities.Stock;
import com.portfolio.repositories.PortfolioRepository;
import com.portfolio.repositories.StockRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final StockRepository stockRepository;
    private final HttpClient httpClient;
    private final String apiKey="";

    public PortfolioService(PortfolioRepository portfolioRepository, StockRepository stockRepository) {
        this.portfolioRepository = portfolioRepository;
        this.stockRepository = stockRepository;
        this.httpClient = HttpClient.newHttpClient();
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
                String name = node.get("description").asText();
                if (stockRepository.findByTicker(ticker).isEmpty()) {
                    Stock stock = new Stock();
                    stock.setTicker(ticker);
                    stock.setName(name);
                    stockRepository.save(stock);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();

        }

    }
}
