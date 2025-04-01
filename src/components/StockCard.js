import React from 'react';

const StockCard = ({ stock }) => {
  // Calculate percentage change
  const percentChange = ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100;
  const isPositive = percentChange > 0;
  const isSignificantChange = Math.abs(percentChange) >= 10;

  return (
    <div className="stock-card">
      <div className="stock-header">
        <span className="stock-symbol">{stock.symbol}</span>
        <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
          {percentChange.toFixed(2)}%
        </span>
      </div>
      
      <div className="stock-name">{stock.name}</div>
      
      <div className="stock-price">
        ${stock.currentPrice.toFixed(2)}
      </div>
      
      <div className="stock-initial">
        Initial: ${stock.initialPrice.toFixed(2)}
      </div>
      
      {isSignificantChange && (
        <div className={`alert ${percentChange <= -10 ? 'danger' : ''}`}>
          {percentChange >= 10 
            ? '🔼 Stock has risen by 10% or more!' 
            : '🔽 Stock has fallen by 10% or more!'}
        </div>
      )}
    </div>
  );
};

export default StockCard;
