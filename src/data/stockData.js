// Static stock data with historical and current prices
const stockData = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    initialPrice: 150.00,
    currentPrice: 175.50,
    history: [
      { date: '2025-03-01', price: 150.00 },
      { date: '2025-03-02', price: 152.30 },
      { date: '2025-03-03', price: 155.75 },
      { date: '2025-03-04', price: 153.20 },
      { date: '2025-03-05', price: 157.80 },
      { date: '2025-03-06', price: 160.25 },
      { date: '2025-03-07', price: 163.40 },
      { date: '2025-03-08', price: 167.55 },
      { date: '2025-03-09', price: 170.20 },
      { date: '2025-03-10', price: 175.50 },
    ]
  },
  {
    id: 2,
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    initialPrice: 280.00,
    currentPrice: 305.75,
    history: [
      { date: '2025-03-01', price: 280.00 },
      { date: '2025-03-02', price: 283.45 },
      { date: '2025-03-03', price: 287.20 },
      { date: '2025-03-04', price: 285.80 },
      { date: '2025-03-05', price: 290.35 },
      { date: '2025-03-06', price: 293.60 },
      { date: '2025-03-07', price: 298.25 },
      { date: '2025-03-08', price: 300.10 },
      { date: '2025-03-09', price: 302.80 },
      { date: '2025-03-10', price: 305.75 },
    ]
  },
  {
    id: 3,
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    initialPrice: 2200.00,
    currentPrice: 2350.00,
    history: [
      { date: '2025-03-01', price: 2200.00 },
      { date: '2025-03-02', price: 2215.30 },
      { date: '2025-03-03', price: 2240.75 },
      { date: '2025-03-04', price: 2230.20 },
      { date: '2025-03-05', price: 2255.80 },
      { date: '2025-03-06', price: 2280.25 },
      { date: '2025-03-07', price: 2310.40 },
      { date: '2025-03-08', price: 2325.55 },
      { date: '2025-03-09', price: 2340.20 },
      { date: '2025-03-10', price: 2350.00 },
    ]
  },
  {
    id: 4,
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    initialPrice: 3200.00,
    currentPrice: 2850.00,
    history: [
      { date: '2025-03-01', price: 3200.00 },
      { date: '2025-03-02', price: 3150.30 },
      { date: '2025-03-03', price: 3100.75 },
      { date: '2025-03-04', price: 3050.20 },
      { date: '2025-03-05', price: 3000.80 },
      { date: '2025-03-06', price: 2950.25 },
      { date: '2025-03-07', price: 2920.40 },
      { date: '2025-03-08', price: 2890.55 },
      { date: '2025-03-09', price: 2870.20 },
      { date: '2025-03-10', price: 2850.00 },
    ]
  },
  {
    id: 5,
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    initialPrice: 800.00,
    currentPrice: 920.50,
    history: [
      { date: '2025-03-01', price: 800.00 },
      { date: '2025-03-02', price: 820.30 },
      { date: '2025-03-03', price: 835.75 },
      { date: '2025-03-04', price: 850.20 },
      { date: '2025-03-05', price: 865.80 },
      { date: '2025-03-06', price: 880.25 },
      { date: '2025-03-07', price: 895.40 },
      { date: '2025-03-08', price: 905.55 },
      { date: '2025-03-09', price: 915.20 },
      { date: '2025-03-10', price: 920.50 },
    ]
  },
  {
    id: 6,
    symbol: 'FB',
    name: 'Meta Platforms, Inc.',
    initialPrice: 320.00,
    currentPrice: 280.25,
    history: [
      { date: '2025-03-01', price: 320.00 },
      { date: '2025-03-02', price: 315.30 },
      { date: '2025-03-03', price: 310.75 },
      { date: '2025-03-04', price: 305.20 },
      { date: '2025-03-05', price: 300.80 },
      { date: '2025-03-06', price: 295.25 },
      { date: '2025-03-07', price: 290.40 },
      { date: '2025-03-08', price: 285.55 },
      { date: '2025-03-09', price: 282.20 },
      { date: '2025-03-10', price: 280.25 },
    ]
  },
  {
    id: 7,
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    initialPrice: 550.00,
    currentPrice: 380.75,
    history: [
      { date: '2025-03-01', price: 550.00 },
      { date: '2025-03-02', price: 535.30 },
      { date: '2025-03-03', price: 510.75 },
      { date: '2025-03-04', price: 490.20 },
      { date: '2025-03-05', price: 470.80 },
      { date: '2025-03-06', price: 445.25 },
      { date: '2025-03-07', price: 430.40 },
      { date: '2025-03-08', price: 410.55 },
      { date: '2025-03-09', price: 395.20 },
      { date: '2025-03-10', price: 380.75 },
    ]
  }
];

export default stockData;
