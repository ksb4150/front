import React from "react";

interface BalanceData {
    currency: string;
    balance: number;
    avg_buy_price: number;
    current_value:number;
}

interface BalanceProps {
    balance: {data: BalanceData[]} | null;
}

const Balance: React.FC<BalanceProps> = ({balance}) => {
    if (!balance || !Array.isArray(balance.data)) {
        return <p>No balance data available.</p>;
    }

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
                    {balance.data.map((item: BalanceData, index: number) => {
                        const currentValue = item.avg_buy_price > 0 
                            ? item.balance * item.avg_buy_price 
                            : item.balance;

                        return (
                            <tr key={index}>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.currency}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{Number(item.balance).toFixed(0)}원</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{Number(item.avg_buy_price).toFixed(0)}원</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{Number(currentValue).toFixed(0)}원</td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div>
    );
};

export default Balance;