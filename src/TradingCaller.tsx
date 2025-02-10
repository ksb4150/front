import React, { useState } from 'react';
import axios from 'axios';

const TradingCaller: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // 매수 또는 매도 요청
    const callApi = async (action: 'buy' | 'sell' | 'hold') => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try{
            const response = await axios.post(`http://localhost:3000/api/trading/trade`, {action});
            if(response.data && response.data.message){
                setMessage(response.data.message);
            }else{
                setMessage("응답을 받을 수 없습니다.");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Upbit 자동 트레이딩</h1>
            <button onClick={() => callApi('buy')} disabled={loading}>매수</button>
            <button onClick={() => callApi('sell')} disabled={loading}>매도</button>
            <button onClick={() => callApi('hold')} disabled={loading}>포지션 유지</button>

            {loading && <p>거래 요청 중...</p>}
            {error && <p style={{ color: "red" }}>오류: {error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
    );
};

export default TradingCaller;