const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Cache to store stock data (30 min TTL)
const stockCache = new NodeCache({ stdTTL: 1800 });

app.use(cors());
app.use(express.json());

/**
 * Yahoo Finance API endpoints 
 * The approach is based on reverse engineering the Yahoo Finance API
 * This is intended for educational purposes only and is subject to their terms of service
 */
const YAHOO_FINANCE_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance';

/**
 * Get stock quote data for a symbol
 */
app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const cacheKey = `stock-${symbol}`;
    
    // Check cache first
    const cachedData = stockCache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }
    
    // Fetch real-time quote data
    const response = await axios.get(
      `${YAHOO_FINANCE_BASE_URL}/chart/${symbol}`,
      {
        params: {
          range: '1mo', // Get 1 month of data
          interval: '1d', // Daily intervals
          includePrePost: true,
          events: 'div,split'
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
        }
      }
    );
    
    // Extract the relevant data
    const stockData = response.data.chart.result[0];
    const meta = stockData.meta;
    const timestamps = stockData.timestamp;
    const quotes = stockData.indicators.quote[0];
    
    // Format the data
    const prices = timestamps.map((timestamp, index) => ({
      date: new Date(timestamp * 1000).toISOString().split('T')[0],
      open: quotes.open[index],
      high: quotes.high[index],
      low: quotes.low[index],
      close: quotes.close[index],
      volume: quotes.volume[index]
    }));
    
    // Create the stock object
    const stock = {
      id: symbol,
      symbol: symbol,
      name: meta.instrumentInfo ? meta.instrumentInfo.shortName : symbol,
      currency: meta.currency,
      exchange: meta.exchangeName,
      initialPrice: prices[0].close,
      currentPrice: meta.regularMarketPrice,
      previousClose: meta.previousClose,
      dayHigh: meta.dayHigh,
      dayLow: meta.dayLow,
      history: prices
    };
    
    // Store in cache
    stockCache.set(cacheKey, stock);
    
    res.json(stock);
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

/**
 * Get multiple stocks at once
 */
app.post('/api/stocks', async (req, res) => {
  try {
    const { symbols } = req.body;
    if (!symbols || !Array.isArray(symbols)) {
      return res.status(400).json({ error: 'Invalid symbols array' });
    }
    
    const stocksData = [];
    
    // Process each symbol (with promise.all for parallel requests)
    await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const cacheKey = `stock-${symbol}`;
          
          // Check cache first
          const cachedData = stockCache.get(cacheKey);
          if (cachedData) {
            stocksData.push(cachedData);
            return;
          }
          
          // Fetch data
          const response = await axios.get(
            `${YAHOO_FINANCE_BASE_URL}/chart/${symbol}`,
            {
              params: {
                range: '1mo',
                interval: '1d',
                includePrePost: true,
                events: 'div,split'
              },
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
              }
            }
          );
          
          const stockData = response.data.chart.result[0];
          const meta = stockData.meta;
          const timestamps = stockData.timestamp;
          const quotes = stockData.indicators.quote[0];
          
          const prices = timestamps.map((timestamp, index) => ({
            date: new Date(timestamp * 1000).toISOString().split('T')[0],
            open: quotes.open[index],
            high: quotes.high[index],
            low: quotes.low[index],
            close: quotes.close[index],
            volume: quotes.volume[index]
          }));
          
          const stock = {
            id: symbol,
            symbol: symbol,
            name: meta.instrumentInfo ? meta.instrumentInfo.shortName : symbol,
            currency: meta.currency,
            exchange: meta.exchangeName,
            initialPrice: prices[0].close,
            currentPrice: meta.regularMarketPrice,
            previousClose: meta.previousClose,
            dayHigh: meta.dayHigh,
            dayLow: meta.dayLow,
            history: prices
          };
          
          // Store in cache
          stockCache.set(cacheKey, stock);
          stocksData.push(stock);
        } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error.message);
        }
      })
    );
    
    res.json(stocksData);
  } catch (error) {
    console.error('Error fetching multiple stocks:', error.message);
    res.status(500).json({ error: 'Failed to fetch stocks data' });
  }
});

/**
 * Search for stock symbols
 */
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    
    const response = await axios.get(
      'https://query1.finance.yahoo.com/v1/finance/search',
      {
        params: {
          q: query,
          quotesCount: 10,
          newsCount: 0
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
        }
      }
    );
    
    const results = response.data.quotes.map(quote => ({
      symbol: quote.symbol,
      name: quote.shortname || quote.longname || quote.symbol,
      exchange: quote.exchange
    }));
    
    res.json(results);
  } catch (error) {
    console.error('Error searching stocks:', error.message);
    res.status(500).json({ error: 'Failed to search stocks' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
