import React from "react";

interface ProfitLossData{
    total_value: number;
    total_invested: number;
    profit_loss: number;
    profit_loss_percentage: number;
}

interface ProfitLossProps{
    profitLoss: ProfitLossData | null;
}

const ProfitLoss: React.FC<ProfitLossProps> = ({profitLoss}) => {
    if(!profitLoss) return null;

    return (
        <div>
            <h2>Profit/Loss</h2>
            <div>
                <p>Total Value: {profitLoss.total_value.toFixed(0)}원</p>
                <p>Total Invested: {profitLoss.total_invested.toFixed(0)}원</p>
                <p>Profit/Loss: {profitLoss.profit_loss.toFixed(0)}원</p>
                <p>Profit/Loss Percentage: {profitLoss.profit_loss_percentage.toFixed(0)}%</p>
            </div>
        </div>
    );
};

export default ProfitLoss;