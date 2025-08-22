package com.portfolio;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@SpringBootApplication
public class FinalApplication {
	private static final String API_KEY = "";
	private static final String SYMBOL = "AAPL";



		public static void main(String[] args) throws Exception {
			HttpClient client = HttpClient.newHttpClient();
			while (true){
				String url = String.format(
						"https://finnhub.io/api/v1/quote?symbol=%s&token=%s",
						SYMBOL, API_KEY
				);
				HttpRequest request = HttpRequest.newBuilder()
						.uri(URI.create(url))
						.build();

				HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
				System.out.println(response.body());
			}



		}
	}

