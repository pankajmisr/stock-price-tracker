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
                Tracking {stocks.length} stocks with alerts for +/-10% changes
              </p>
              {/* Display summary of stocks with significant changes */}
              {stocks.filter(stock => 
                Math.abs(((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100) >= 10
              ).length > 0 && (
                <div className="significant-changes">
                  <h3>Significant Changes Alert:</h3>
                  <ul>
                    {stocks
                      .filter(stock => 
                        Math.abs(((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100) >= 10
                      )
                      .map(stock => (
                        <li key={stock.id}>
                          {stock.symbol}: {
                            ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100 >= 10 
                            ? '🔼 Up' 
                            : '🔽 Down'
                          } by {
                            Math.abs(
                              ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100
                            ).toFixed(2)
                          }%
                        </li>
                      ))
                    }
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
