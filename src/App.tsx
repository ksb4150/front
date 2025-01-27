import React from "react";
import ConnectCaller from "./ConnectCaller";
import TradingCaller from "./TradingCaller";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>자산 조회 및 주식 차트</h1>
      <ConnectCaller/>

      <h1>자동 매수 / 매도</h1>
      <TradingCaller/>
    </div>
  );
};

export default App;
