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

const StackedDailyChart = (props) => {
  const { dates, totals, memberData } = props;
  const background = [
    {
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
    {
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      borderColor: "rgb(255, 206, 86)",
      backgroundColor: "rgba(255, 206, 86, 0.5)",
    },
    {
      borderColor: "rgb(7153, 102, 255)",
      backgroundColor: "rgba(153, 102, 255, 0.5)",
    },
    {
      borderColor: "rgb(255, 159, 64)",
      backgroundColor: "rgba(255, 159, 64, 0.5)",
    },
    {
      borderColor: "rgb(188, 184, 138)",
      backgroundColor: "rgba(188, 184, 138, 0.5)",
    },
  ];
  const datasets = totals.map((item, idx) => {
    return {
      label: memberData[idx].name,
      data: item,
      borderColor: background[idx].borderColor,
      backgroundColor: background[idx].backgroundColor,
      borderWidth: 1,
    };
  });
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
        position: "right",
      },
    },
  };

  const labels = dates;
  const data = {
    labels,
    datasets: datasets,
  };
  return <Bar options={options} data={data} updateMode="resize" />;
};
export default StackedDailyChart;
