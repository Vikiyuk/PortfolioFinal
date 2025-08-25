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
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-4 bg-purple-950 shadow rounded my-4">
      <h2 className="text-lg font-semibold mb-2">Price Graph</h2>
      <Line data={data} />
    </div>
  );
};

export default PriceGraph;
