import React, { useState } from 'react';
import axios from 'axios';
import StockChart from './Chart';
import ProfitLoss from './ProfitLoss';
import Balance from './Balance';

const ApiCaller: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [profitLoss, setProfitLoss] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = async (endpoint: string, setData: React.Dispatch<React.SetStateAction<any>>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/${endpoint}`);
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upbit API Caller</h1>
      
      <div>
        <button onClick={() => callApi('chart', setChartData)}>Get Chart Data</button>
        <button onClick={() => callApi('balance', setBalance)}>Get Balance</button>
        <button onClick={() => callApi('profit-loss', setProfitLoss)}>Get Profit/Loss</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Balance balance={balance}/>
      <ProfitLoss profitLoss={profitLoss}/>

      <div>
        <h2>Chart Data</h2>
        {error && <div style={{color:"red"}}>Error : {error}</div>}
        {loading ? <p>Loading Data...</p> : chartData && <StockChart chartData={chartData}></StockChart>}
      </div>
    </div>
  );
};

export default ApiCaller;