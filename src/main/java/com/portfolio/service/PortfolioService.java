package com.portfolio.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.dto.StockTrend;
import com.portfolio.entities.*;
import com.portfolio.repositories.*;
import org.springframework.stereotype.Service;
import io.github.cdimascio.dotenv.Dotenv;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final StockRepository stockRepository;
    private final HttpClient httpClient;
    private final HoldingRepository holdingRepository;
    private final HoldingHistoryRepository holdingHistoryRepository;
    private final StockHistoryRepository stockHistoryRepository;
    private final BalanceRepository balanceRepository;
    private Balance balanceEntity;
    Dotenv dotenv = Dotenv.load();

    private final String apiKey = dotenv.get("API_KEY");

    public PortfolioService(PortfolioRepository portfolioRepository, StockRepository stockRepository, HoldingRepository holdingRepository, HoldingHistoryRepository holdingHistoryRepository, StockHistoryRepository stockHistoryRepository, BalanceRepository balanceRepository) {
        this.portfolioRepository = portfolioRepository;
        this.stockRepository = stockRepository;
        this.holdingRepository = holdingRepository;
        this.holdingHistoryRepository = holdingHistoryRepository;
        this.stockHistoryRepository = stockHistoryRepository;
        this.balanceRepository = balanceRepository;
        this.httpClient = HttpClient.newHttpClient();
        this.balanceEntity = balanceRepository.findById(1L).orElseGet(() -> {
            Balance newBalance = new Balance(new BigDecimal("1000000"));
            return balanceRepository.save(newBalance);
        });
    }

    public List<Stock> getAllStock(){
        return this.stockRepository.findAll();
    }

    public Stock getStockByTicker(String ticker){
        return this.stockRepository.findByTicker(ticker).get();
    }

    public void loadStockSymbols() {
        try {
            String url = "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=" + this.apiKey;
            HttpRequest request = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create(url))
                    .header("Accept", "application/json")
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response.body());

            int count = 0;
            for (JsonNode node : root) {
                if (count >= 1000) break;

                String ticker = node.get("symbol").asText();
                String name = node.get("description").asText();
                if (stockRepository.findByTicker(ticker).isPresent()) continue;

                String urlPrice = "https://finnhub.io/api/v1/quote?symbol=" + ticker + "&token=" + this.apiKey;
                HttpRequest requestPrice = HttpRequest.newBuilder()
                        .GET()
                        .uri(URI.create(urlPrice))
                        .header("Accept", "application/json")
                        .build();

                HttpResponse<String> responsePrice = httpClient.send(requestPrice, HttpResponse.BodyHandlers.ofString());
                JsonNode rootPrice = objectMapper.readTree(responsePrice.body());

                if (rootPrice.has("c") && !rootPrice.get("c").isNull()) {
                    BigDecimal price = new BigDecimal(rootPrice.get("c").asText());

                    if (price.compareTo(BigDecimal.ONE) > 0) {
                        Stock stock = new Stock();
                        stock.setTicker(ticker);
                        stock.setName(name);
                        stock.setPrice(price);
                        stockRepository.save(stock);
                        count++;
                    }
                }
            }

            System.out.println("Loaded " + count + " stocks.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void loadPricePerSymbol() throws IOException, InterruptedException {
        for (Stock stock : stockRepository.findAll()) {
            boolean fetched = false;
            int attempts = 0;
            while (!fetched) {
                try {
                    String url = "https://finnhub.io/api/v1/quote?symbol=" + stock.getTicker() + "&token=" + this.apiKey;
                    HttpRequest request = HttpRequest.newBuilder()
                            .GET()
                            .uri(URI.create(url))
                            .header("Accept", "application/json")
                            .build();
                    HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
                    ObjectMapper objectMapper = new ObjectMapper();
                    JsonNode root = objectMapper.readTree(response.body());
                    JsonNode priceNode = root.get("c");

                    if (priceNode != null && !priceNode.isNull()) {
                        BigDecimal newPrice = new BigDecimal(priceNode.asText());
                        if (stock.getPrice() != null && newPrice.compareTo(stock.getPrice()) != 0) {
                            stock.setPrice(newPrice);
                            stockRepository.save(stock);
                            saveStockToHistory(stock);
                            System.out.println("Ticker: " + stock.getTicker() + " Price: " + stock.getPrice());
                        }
                        fetched = true;
                    } else {
                        System.err.println("Missing price for " + stock.getTicker() + ". Response: " + response.body());
                    }
                } catch (Exception e) {
                    System.err.println("Error fetching price for " + stock.getTicker() + ": " + e.getMessage());
                }

                if (!fetched) {
                    attempts++;
                    Thread.sleep(150);
                }
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
        BigDecimal cost = holding.getPrice().multiply(holding.getQuantity());
        if (balanceEntity.getAmount().compareTo(cost) < 0) {
            throw new ArithmeticException("Insufficient balance");
        }
        balanceEntity.setAmount(balanceEntity.getAmount().subtract(cost));
        balanceRepository.save(balanceEntity);
        System.out.println(balanceEntity.getAmount());
    }

    public void removeHolding(String id) {
        holdingRepository.delete(holdingRepository.findById(Long.parseLong(id)).orElse(null));
    }

    public void updateHolding(String id, String quantity) {
        Holding holding = this.holdingRepository.findById(Long.parseLong(id)).orElse(null);
        BigDecimal quantityConverted = new BigDecimal(quantity);
        if (holding != null) {
            BigDecimal adjustment = holding.getQuantity().subtract(quantityConverted).multiply(holding.getPrice());
            BigDecimal newBalance = balanceEntity.getAmount().add(adjustment);
            if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
                throw new ArithmeticException("Insufficient balance");
            }
            balanceEntity.setAmount(newBalance);
            balanceRepository.save(balanceEntity);

            System.out.println(balanceEntity.getAmount());
            holding.setQuantity(quantityConverted);
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

    public String calculateGainLoss(String id, String newQuantityString){
        Holding holding = holdingRepository.findById(Long.parseLong(id)).get();
        BigDecimal newQuantity= new BigDecimal(newQuantityString);
        return holding.getQuantity().multiply(holding.getPrice()).subtract(newQuantity.multiply(holding.getPrice())).toString();
    }

    private BigDecimal simulatePrice(BigDecimal currentPrice) {
        double changePercent = (Math.random() - 0.5) * 0.1;
        BigDecimal change = currentPrice.multiply(BigDecimal.valueOf(changePercent));
        return currentPrice.add(change).max(BigDecimal.ONE);
    }

    public void generateFakeStockHistory() {
        List<Stock> stocks = stockRepository.findAll();
        LocalDate startDate = LocalDate.now().minusDays(14);
        LocalDate endDate = LocalDate.now();

        for (Stock stock : stocks) {
            BigDecimal price = stock.getPrice();

            for (LocalDate date = startDate; date.isBefore(endDate); date = date.plusDays(1)) {
                price = simulatePrice(price);

                StockHistory history = new StockHistory();
                history.setTicker(stock.getTicker());
                history.setName(stock.getName());
                history.setPrice(price);
                history.setTimestampHistory(date.atStartOfDay());

                stockHistoryRepository.save(history);
            }
        }

        System.out.println("Fake stock history generated.");
    }



    public List<StockTrend> getTrends() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime fourteenDaysAgo = now.minusDays(14);

        List<StockHistory> recentHistory = stockHistoryRepository.findByTimestampHistoryBetween(fourteenDaysAgo, now);

        Map<String, List<StockHistory>> grouped = recentHistory.stream()
                .collect(Collectors.groupingBy(StockHistory::getTicker));

        List<StockTrend> trends = new ArrayList<>();

        for (Map.Entry<String, List<StockHistory>> entry : grouped.entrySet()) {
            String ticker = entry.getKey();
            List<StockHistory> history = entry.getValue();
            history.sort(Comparator.comparing(StockHistory::getTimestampHistory));

            BigDecimal startPrice = history.get(0).getPrice();
            BigDecimal endPrice = history.get(history.size() - 1).getPrice();

            Optional<Stock> stockOpt = stockRepository.findByTicker(ticker);
            if (stockOpt.isPresent()) {
                Stock stock = stockOpt.get();
                StockTrend trend = new StockTrend(ticker, stock.getName(), startPrice, endPrice);
                trends.add(trend);
            }
        }
        List<StockTrend> sorted = trends.stream()
                .sorted(Comparator.comparing(StockTrend::getPercentChange).reversed())
                .collect(Collectors.toList());

        List<StockTrend> result = new ArrayList<>();

        result.addAll(sorted.stream().limit(5).collect(Collectors.toList()));

        result.addAll(sorted.stream()
                .sorted(Comparator.comparing(StockTrend::getPercentChange))
                .limit(5)
                .collect(Collectors.toList()));

        return result;
    }
    public List<StockHistory> getStock14DaysHistory(String id) {
        Stock searchedStock = stockRepository.findById(Long.parseLong(id)).get();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime fourteenDaysAgo = now.minusDays(14);

        List<StockHistory> recentHistory = stockHistoryRepository.findByTickerAndTimestampHistoryBetween(searchedStock.getTicker(), fourteenDaysAgo, now);
        return recentHistory;
    }

}
