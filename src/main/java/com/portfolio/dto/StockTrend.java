package com.portfolio.dto;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class StockTrend {
    private String ticker;
    private String name;
    private BigDecimal startPrice;
    private BigDecimal endPrice;
    private BigDecimal priceChange;

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(BigDecimal startPrice) {
        this.startPrice = startPrice;
    }

    public BigDecimal getEndPrice() {
        return endPrice;
    }

    public void setEndPrice(BigDecimal endPrice) {
        this.endPrice = endPrice;
    }

    public BigDecimal getPriceChange() {
        return priceChange;
    }

    public void setPriceChange(BigDecimal priceChange) {
        this.priceChange = priceChange;
    }

    private BigDecimal percentChange;

    public StockTrend(String ticker, String name, BigDecimal startPrice, BigDecimal endPrice) {
        this.ticker = ticker;
        this.name = name;
        this.startPrice = startPrice;
        this.endPrice = endPrice;
        this.priceChange = endPrice.subtract(startPrice);
        this.percentChange = startPrice.compareTo(BigDecimal.ZERO) > 0
                ? priceChange.divide(startPrice, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100))
                : BigDecimal.ZERO;
    }

    public BigDecimal getPercentChange() {
        return percentChange;
    }

    public void setPercentChange(BigDecimal percentChange) {
        this.percentChange = percentChange;
    }
}
