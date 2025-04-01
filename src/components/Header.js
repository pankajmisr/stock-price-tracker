import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <h1>Stock Price Tracker</h1>
      <p>Track real-time stock prices from Yahoo Finance with alerts for significant changes</p>
      <div className="data-source">
        Powered by Yahoo Finance API data
      </div>
    </div>
  );
};

export default Header;
