import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar'
import Image from './currlogo2.svg'

console.log(Image)
const App = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Fetch exchange rates from a free API (replace with your preferred API)
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
     
    axios.get(apiUrl)
          .then(response => {
            setExchangeRates(response.data.rates);
          })
          .catch(error => {
            console.error('Error fetching exchange rates:', error);
          });
      }, [fromCurrency]);
  useEffect(() => {
    // Convert currency when 'amount', 'fromCurrency', or 'toCurrency' changes
    const conversionRate = exchangeRates[toCurrency];
    if (conversionRate) {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'amount':
        setAmount(value);
      break;
      case 'fromCurrency':
        setFromCurrency(value);
        break;
      case 'toCurrency':
        setToCurrency(value);
        break;
      default:
      break;
    }
  };


  return (
    <>
    <Navbar title="CurRate Converter" />
      <div className='container'>
        <div className='card' data-bs-theme="dark">
          <div className='logo_head'>
          <img src={Image} alt="Logo" width="60" height="75" class="d-inline-block align-text-top" />
          <h3>Currency Converter</h3>
          </div>
        <div className='currency_exchnage'>
            <div className="input_container" >
              <label className="input_label">Amount</label>
              <input
              type="number"
              name="amount"
              className="input_field"
              value={amount}
              onChange={handleChange}
              />
            </div>
            <div className="input_container">
            <label className="input_label">From</label>
            <select
              name="fromCurrency"
              value={fromCurrency}
              onChange={handleChange}
              className="input_field"
            >
            {Object.keys(exchangeRates).map(currency => (
                <option key={currency} value={currency}>
                {currency}
                </option>
          ))}
              </select>
            </div>
            <div className="input_container">
        <label className="input_label">To</label>
        <select
          name="toCurrency"
          value={toCurrency}
          onChange={handleChange}
          className="input_field"
        >
          {Object.keys(exchangeRates).map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
              </select>
            </div>
        </div>
        <div className='output'>
          <h5>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</h5>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
