import React from "react";

interface BalanceData {
    current: string;
    balance: number;
    avg_buy_price: number;
    current_value:number;
}

interface BalanceProps {
    balance: BalanceData[] | null;
}

const Balance: React.FC<BalanceProps> = ({balance}) => {
    if(!balance) return null;

    return (
        <div>
            <h2>Balance</h2>
            <table style={{ border: "1px solid black", borderCollapse: "collapse", width: "100%" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Currency</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Balance</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Avg Buy Price</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Current Value</th>
                </tr>
                </thead>
                <tbody>
                {balance.map((item: any, index: number) => (
                    <tr key={index}>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{item.currency}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{item.balance.toFixed(0)}원</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{item.avg_buy_price.toFixed(0)}원</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{item.current_value.toFixed(0)}원</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Balance;