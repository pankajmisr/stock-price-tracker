import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StockGrid from './components/StockGrid';
import stockData from './data/stockData';
import './App.css';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API call with our static data
  useEffect(() => {
    const fetchStocks = () => {
      // Simulate network delay
      setTimeout(() => {
        setStocks(stockData);
        setLoading(false);
      }, 1000);
    };

    fetchStocks();
  }, []);

  // Get stocks with severe drops (30% or more)
  const severeDropStocks = stocks.filter(stock => 
    ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100 <= -30
  );

  // Get stocks with significant changes (10% or more but less than 30%)
  const significantChangeStocks = stocks.filter(stock => {
    const percentChange = ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100;
    return Math.abs(percentChange) >= 10 && percentChange > -30;
  });

  return (
    <div className="App">
      <Header />
      <div className="container">
        {loading ? (
          <div className="loading">Loading stock data...</div>
        ) : (
          <>
            <div className="dashboard-summary">
              <h2>Stock Dashboard</h2>
              <p>
                Tracking {stocks.length} stocks with alerts for +/-10% changes and severe drops (30%+)
              </p>
              
              {/* Display severe drop alerts - new section */}
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
                            percentChange >= 10 
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
