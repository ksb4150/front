import React from "react";

interface AssetDetail {
    currency: string;
    balance: number;
    current_price: number;
    avg_buy_price: number;
    profit_loss: number;
    profit_loss_rate: number;
}

interface ProfitLossData {
    total_assets: number;
    total_bought: number;
    total_profit_loss: number;
    total_profit_loss_rate: number;
    assets_detail: AssetDetail[];
}

interface ProfitLossProps {
    profitLoss: { data: ProfitLossData } | null;
}

const ProfitLoss: React.FC<ProfitLossProps> = ({ profitLoss }) => {
    if (!profitLoss) return null;

    const data = profitLoss.data;

    return (
        <div>
            <h2>Profit/Loss Summary</h2>
            <div>
                <p>Total Assets: {Number(data.total_assets || 0).toFixed(0)}원</p>
                <p>Total Bought: {Number(data.total_bought || 0).toFixed(0)}원</p>
                <p>Profit/Loss: {Number(data.total_profit_loss || 0).toFixed(0)}원</p>
                <p>Profit/Loss Percentage: {Number(data.total_profit_loss_rate || 0).toFixed(2)}%</p>
            </div>

            <h3>Asset Details</h3>
            <table style={{ border: "1px solid black", borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Currency</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Balance</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Current Price</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Avg Buy Price</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Profit/Loss</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Profit/Loss %</th>
                    </tr>
                </thead>
                <tbody>
                    {data.assets_detail.map((asset, index) => (
                        <tr key={index}>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{asset.currency}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{Number(asset.balance || 0).toFixed(0)}원</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{Number(asset.current_price || 0).toFixed(0)}원</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{Number(asset.avg_buy_price || 0).toFixed(0)}원</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{Number(asset.profit_loss || 0).toFixed(0)}원</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{Number(asset.profit_loss_rate || 0).toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProfitLoss;
