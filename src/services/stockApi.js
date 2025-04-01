import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Default stock symbols to track if none are provided
const DEFAULT_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'FB', 'NFLX'];

/**
 * Class to handle interactions with the stock API
 */
class StockApiService {
  /**
   * Fetch data for a single stock
   * @param {string} symbol - Stock symbol (e.g., AAPL)
   * @returns {Promise<Object>} Stock data
   */
  async getStock(symbol) {
    try {
      const response = await axios.get(`${API_URL}/stock/${symbol}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stock ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Fetch data for multiple stocks
   * @param {string[]} symbols - Array of stock symbols
   * @returns {Promise<Array>} Array of stock data
   */
  async getStocks(symbols = DEFAULT_SYMBOLS) {
    try {
      const response = await axios.post(`${API_URL}/stocks`, { symbols });
      return response.data;
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw error;
    }
  }

  /**
   * Search for stocks by query
   * @param {string} query - Search query
   * @returns {Promise<Array>} Search results
   */
  async searchStocks(query) {
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching stocks:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export default new StockApiService();
