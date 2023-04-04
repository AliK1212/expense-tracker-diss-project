import React from 'react';
import { Pie } from 'react-chartjs-2';

const ExpenseDistributionPieChart = ({ data }) => {
  if (!data) {
    return null;
  }

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Pie data={chartData} options={chartOptions} />;
};

export default ExpenseDistributionPieChart;
