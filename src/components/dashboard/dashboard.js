import "./dashboard.css";
import React from "react";
import SingleTagPie from "../chart/pieChart";
import StackedDailyChart from "../chart/stackedBar";
const Dashboard = (props) => {
  const { pieData, dates, totals, memberData } = props;
  const pieLabels = pieData.map((item, idx) => item.tag);
  const pieTotals = pieData.map((item, idx) => item.total);

  return (
    <div className="dashboards-container">
      <div className="dashboard-container">
        <div className="dashboard-chart">
          <SingleTagPie pieLabels={pieLabels} pieTotals={pieTotals} />
        </div>
        {/* <div className="dashboard-details">
          <div className="dashboard-header">Detail</div>
          {pieData.map((item, idx) => {
            return (
              <div className="dashboard-detail">
                <div className="dashboard-detail-title">
                  {item.tag.toUpperCase()}
                </div>
                <div className="dashboard-detail-content">{item.total}</div>
              </div>
            );
          })}
        </div> */}
      </div>
      <div className="dashboard-container">
        <div className="dashboard-chart">
          <StackedDailyChart
            className="lineChart"
            dates={dates}
            totals={totals}
            memberData={memberData}
          />
        </div>
        {/* <div className="dashboard-details">
          <div className="dashboard-header">Detail</div>
        </div> */}
      </div>
    </div>
  );
};
export default Dashboard;
