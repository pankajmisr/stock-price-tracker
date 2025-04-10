import React from 'react';

const StockCard = ({ stock }) => {
  // Calculate percentage change
  const percentChange = ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100;
  const isPositive = percentChange > 0;
  const isSignificantChange = Math.abs(percentChange) >= 5;
  // Check for severe drop (30% or more)
  const isSevereDrop = percentChange <= -30;

  // Calculate day change
  const dayChange = stock.previousClose ? 
    ((stock.currentPrice - stock.previousClose) / stock.previousClose) * 100 : 0;
  const isDayPositive = dayChange > 0;

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
        ${stock.currentPrice?.toFixed(2) || '0.00'} 
        <span className={`day-change ${isDayPositive ? 'positive' : 'negative'}`}>
          {dayChange ? `${isDayPositive ? '+' : ''}${dayChange.toFixed(2)}%` : ''}
        </span>
      </div>
      
      {stock.exchange && (
        <div className="stock-exchange">
          {stock.exchange}
        </div>
      )}
      
      <div className="stock-details">
        <div className="detail-row">
          <span className="detail-label">Open:</span>
          <span className="detail-value">${stock.history?.[stock.history.length-1]?.open?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">High:</span>
          <span className="detail-value">${stock.dayHigh?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Low:</span>
          <span className="detail-value">${stock.dayLow?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Initial:</span>
          <span className="detail-value">${stock.initialPrice?.toFixed(2) || '0.00'}</span>
        </div>
      </div>
      
      {isSevereDrop ? (
        <div className="severe-drop-alert">
          ⚠️ CRITICAL: Stock has dropped by 30% or more!
        </div>
      ) : isSignificantChange && (
        <div className={`alert ${percentChange <= -5 ? 'danger' : ''}`}>
          {percentChange >= 5 
            ? '🔼 Stock has risen by 5% or more!' 
            : '🔽 Stock has fallen by 5% or more!'}
        </div>
      )}
      
      {stock.history && stock.history.length > 0 && (
        <div className="last-updated">
          Updated: {new Date().toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default StockCard;
