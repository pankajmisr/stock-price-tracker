import React from 'react';
import StockCard from './StockCard';

const StockGrid = ({ stocks }) => {
  return (
    <div className="stock-grid">
      {stocks.map(stock => (
        <StockCard key={stock.id} stock={stock} />
      ))}
    </div>
  );
};

export default StockGrid;
