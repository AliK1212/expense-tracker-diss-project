import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  if (!data) {
    return null;
  }

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: 'Expenses',
        data: data.map((item) => item.value),
        backgroundColor: data.map(() => 'rgba(75, 192, 192, 0.2)'),
        borderColor: data.map(() => 'rgba(75, 192, 192, 1)'),
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
