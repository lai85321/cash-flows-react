import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const SingleTagPie = (props) => {
  const { pieLabels, pieTotals } = props;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
  };
  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        label: "single book tag pie chart",
        data: pieTotals,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(188, 184, 138, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(188, 184, 138, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie options={options} data={pieChartData} />;
};
export default SingleTagPie;
