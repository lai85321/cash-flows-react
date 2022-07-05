import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthBalanceChart = (props) => {
  const { days, expenses } = props;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        grid: {
          drawBorder: false,
          borderWidth: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = days;
  const data = {
    labels,
    datasets: [
      {
        label: "expense",
        data: expenses,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 1,
      },
    ],
  };
  return <Line options={options} data={data} updateMode="resize" />;
};
export default MonthBalanceChart;
