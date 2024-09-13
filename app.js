const express = require('express');
const cors = require('cors');  // Import the cors middleware
const path = require('path');
const axios = require('axios');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Your routes and other middlewares here

app.get('/api/exchange-rate', async (req, res) => {
    const currency = req.query.currency || 'BTC'; // Base currency (default to BTC)
    const exchangeCurrency = req.query.exchange_currency || 'USD'; // Exchange currency (default to USD)
  
    try {
      // Call the Coinbase API
      const response = await axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`);
    //   console.log(response)

      const rates = response.data.data.rates;
  
      // Check if the exchange currency exists in the response
      if (rates[exchangeCurrency]) {
        res.json({
          base_currency: currency,
          exchange_currency: exchangeCurrency,
          exchange_rate: rates[exchangeCurrency],
        });
      } else {
        res.status(404).json({ error: `Exchange currency ${exchangeCurrency} not found` });
      }
  
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Error fetching data from Coinbase' });
    }
  });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
