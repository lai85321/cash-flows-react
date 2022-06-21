import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SingleDailyChart = (props) => {
  const { dates, totals } = props;

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
        position: "none",
      },
    },
  };

  const labels = dates;
  const data = {
    labels,
    datasets: [
      {
        data: totals,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 1,
      },
    ],
  };
  return <Bar options={options} data={data} updateMode="resize" />;
};
export default SingleDailyChart;
