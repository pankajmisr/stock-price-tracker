import React from 'react';

const StockCard = ({ stock }) => {
  // Calculate percentage change
  const percentChange = ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100;
  const isPositive = percentChange > 0;
  const isSignificantChange = Math.abs(percentChange) >= 10;
  // New check for severe drop (30% or more)
  const isSevereDrop = percentChange <= -30;

  return (
    <div className={`stock-card ${isSevereDrop ? 'severe-drop' : ''}`}>
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
      
      {isSevereDrop ? (
        <div className="severe-drop-alert">
          ⚠️ CRITICAL: Stock has dropped by 30% or more!
        </div>
      ) : isSignificantChange && (
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
