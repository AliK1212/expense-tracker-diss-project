import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = ({ data }) => {
  if (!data) {
    return null;
  }

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: 'Expenses',
        data: data.map((item) => item.value),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineGraph;
