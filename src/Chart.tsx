import React from "react";
import { Box, Paper } from "@mui/material";
import { Chart } from "react-chartjs-2";
import "chartjs-chart-financial";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TimeScale,
  ChartData,
  ChartOptions,
} from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";

ChartJS.register(
  CategoryScale,
  LinearScale,
  CandlestickController,
  CandlestickElement,
  Tooltip,
  Legend,
  TimeScale
);

declare module 'chart.js' {
  interface ElementOptionsByType<TType> {
    candlestick: {
      width?: number;
      borderWidth?: number;
    }
  }
}

interface ChartProps {
  chartData: any;
}

const StockChart: React.FC<ChartProps> = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return <div>Loading Chart Data ...</div>;
  }

  const formattedData: ChartData<"candlestick"> = {
    datasets: [
      {
        label: "주가 변동 차트",
        data: chartData.map((d: any) => ({
          x: d.index instanceof Date ? d.index : new Date(d.index),
          o: d.open,
          h: d.high,
          l: d.low,
          c: d.close,
        })),
        type: "candlestick" as const,
        yAxisID: "y",
      }
    ],
  };

  const options: ChartOptions<'candlestick'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'hour',
          tooltipFormat: 'yyyy-MM-dd HH:mm',
          displayFormats: {
            hour: 'HH:mm'
          }
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 24,
          source: 'auto'
        }
      },
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        title: {
          display: true,
          text: '가격'
        }
      }
    },
    elements: {
      candlestick: {
        width: 4,
        borderWidth: 1
      }
    }
  };

  return (
    <Paper sx={{ p: 2, width: "70%", height: 500 }}>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Chart 
          type="candlestick"
          data={formattedData} 
          options={options}
        />
      </Box>
    </Paper>
  );
};

export default StockChart;