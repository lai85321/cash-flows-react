import "./dashboard.css";
import React from "react";
const Dashboard = () => {
  return (
    <div className="dashboards-container">
      <div className="dashboard-container">
        <div className="dashboard-chart"></div>
        <div className="dashboard-details"></div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-chart"></div>
        <div className="dashboard-details"></div>
      </div>
    </div>
  );
};
export default Dashboard;
