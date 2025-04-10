import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StockGrid from './components/StockGrid';
import stockApi from './services/stockApi';
import './App.css';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSymbols, setSelectedSymbols] = useState(
    ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NFLX']
  );

  // Fetch stock data on component mount or when selected symbols change
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await stockApi.getStocks(selectedSymbols);
        setStocks(data);
      } catch (err) {
        console.error('Failed to fetch stocks:', err);
        setError('Failed to fetch stock data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
    
    // Set up automatic refresh every 5 minutes
    const refreshInterval = setInterval(fetchStocks, 300000);
    
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [selectedSymbols]);

  // Handle search for new stocks
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      const results = await stockApi.searchStocks(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error('Failed to search stocks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a stock to the tracked list
  const addStock = (symbol) => {
    if (!selectedSymbols.includes(symbol)) {
      setSelectedSymbols([...selectedSymbols, symbol]);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  // Remove a stock from the tracked list
  const removeStock = (symbol) => {
    setSelectedSymbols(selectedSymbols.filter(s => s !== symbol));
  };

  // Get stocks with severe drops (30% or more)
  const severeDropStocks = stocks.filter(stock => 
    ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100 <= -30
  );

  // Get stocks with significant changes (5% or more but less than 30%)
  const significantChangeStocks = stocks.filter(stock => {
    const percentChange = ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100;
    return Math.abs(percentChange) >= 5 && percentChange > -30;
  });

  return (
    <div className="App">
      <Header />
      <div className="container">
        {/* Stock search form */}
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a stock (e.g., AAPL, Tesla)"
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          
          {/* Display search results */}
          {searchResults.length > 0 && (
            <div className="search-results">
              <h3>Search Results</h3>
              <ul>
                {searchResults.map((result) => (
                  <li key={result.symbol} className="search-result-item">
                    <div>
                      <strong>{result.symbol}</strong> - {result.name}
                    </div>
                    <button
                      onClick={() => addStock(result.symbol)}
                      disabled={selectedSymbols.includes(result.symbol)}
                      className="add-button"
                    >
                      {selectedSymbols.includes(result.symbol) ? 'Added' : 'Add'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Display error if any */}
        {error && <div className="error-message">{error}</div>}

        {/* Display loading or stock data */}
        {loading && !error ? (
          <div className="loading">Loading stock data...</div>
        ) : (
          <>
            <div className="dashboard-summary">
              <h2>Real-Time Stock Dashboard</h2>
              <p>
                Tracking {stocks.length} stocks with alerts for +/-5% changes and severe drops (30%+)
              </p>
              <div className="tracked-symbols">
                <h3>Tracked Stocks:</h3>
                <div className="symbol-badges">
                  {selectedSymbols.map(symbol => (
                    <div key={symbol} className="symbol-badge">
                      {symbol}
                      <button 
                        className="remove-symbol" 
                        onClick={() => removeStock(symbol)}
                        title="Remove from tracking"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Display severe drop alerts */}
              {severeDropStocks.length > 0 && (
                <div className="severe-drops">
                  <h3 style={{ color: '#b71c1c' }}>⚠️ SEVERE DROP ALERTS:</h3>
                  <ul>
                    {severeDropStocks.map(stock => (
                      <li key={stock.id} style={{ color: '#b71c1c', fontWeight: 'bold' }}>
                        {stock.symbol}: 🚨 Down by {
                          Math.abs(
                            ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100
                          ).toFixed(2)
                        }%
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Display summary of stocks with significant changes */}
              {significantChangeStocks.length > 0 && (
                <div className="significant-changes">
                  <h3>Significant Changes Alert:</h3>
                  <ul>
                    {significantChangeStocks.map(stock => {
                      const percentChange = ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100;
                      return (
                        <li key={stock.id}>
                          {stock.symbol}: {
                            percentChange >= 5 
                            ? '🔼 Up' 
                            : '🔽 Down'
                          } by {
                            Math.abs(percentChange).toFixed(2)
                          }%
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <StockGrid stocks={stocks} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
