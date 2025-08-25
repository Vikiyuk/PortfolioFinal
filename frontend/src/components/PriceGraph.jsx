// src/components/PriceGraph.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const PriceGraph = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Stock Price',
        data: [120, 130, 125, 140, 135],
        borderColor: 'purple',
        backgroundColor: 'rgba(157,78,221,0.2)', // subtle fill
        tension: 0.4,
        pointBackgroundColor: 'purple',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white', // legend text color
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'grey', // X-axis grid color
        },
        ticks: {
          color: 'white', // X-axis labels color
        },
      },
      y: {
        grid: {
          color: 'grey', // Y-axis grid color
        },
        ticks: {
          color: 'white', // Y-axis labels color
        },
      },
    },
  };

  return (
    <div className="p-4 bg-black shadow rounded my-4">
      <h2 className="text-lg font-semibold mb-2 text-purple-400">Price Graph</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default PriceGraph;
