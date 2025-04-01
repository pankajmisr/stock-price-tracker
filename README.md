# Stock Price Tracker

A React application that tracks stock prices in real-time from Yahoo Finance and provides visual alerts when a stock rises above 10% or falls below 10% of its initial value, with special warnings for severe drops of 30% or more.

## Features

- Real-time stock data from Yahoo Finance API
- Visual indicators for significant price changes:
  - Green for positive changes
  - Red for negative changes
  - Special alert badges for changes of 10% or more
  - Critical warning alerts for drops of 30% or more
- Responsive dashboard overview of multiple stocks
- Detailed view for individual stock performance
- Search functionality to add new stocks to track
- Automatic data refresh every 5 minutes

## Architecture

The application consists of:

1. **React Frontend**: User interface for visualizing stock data
2. **Node.js Backend**: Server that communicates with the Yahoo Finance API
3. **Yahoo Finance API**: Source of real-time stock market data

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Backend Setup

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Start the server
npm start
```

The server will run on http://localhost:5000 by default.

### Frontend Setup

```bash
# Navigate to the project root directory
cd ..

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at http://localhost:3000.

## Usage

1. Browse the dashboard to view stock performance
2. Use the search box to find and add new stocks to track
3. Monitor the alerts section for significant price changes
4. Remove stocks from tracking by clicking the 'X' button

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/stock/:symbol` - Get data for a specific stock
- `POST /api/stocks` - Get data for multiple stocks
- `GET /api/search?query={query}` - Search for stocks

## Data Source

This application uses the Yahoo Finance API to fetch real-time stock data. Note that:

- Some data may be delayed by 15 minutes based on exchange rules
- The application caches data for 30 minutes to reduce API calls
- This implementation is for educational purposes and follows Yahoo's terms of service

## Future Enhancements

- User authentication for personalized watchlists
- Email/push notifications for price alerts
- Historical performance charts
- Portfolio tracking with investment performance metrics
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Yahoo Finance for providing the data API
- React and Node.js communities for excellent documentation
