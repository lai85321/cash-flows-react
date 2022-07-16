import "./dashboard.css";
import React from "react";
import SingleTagPie from "../chart/pieChart";
import MonthBalanceChart from "../chart/lineChart";
const Dashboard = (props) => {
  const { pieData, days, expenses, startMonth, setStartMonth, isLoading } =
    props;
  const pieLabels = pieData.map((item, idx) => item.tag);
  const pieTotals = pieData.map((item, idx) => item.total);
  return (
    <div className="dashboards-container">
      <div className="dashboards-month">
        <input
          type="month"
          className="dashboards-month-input"
          value={startMonth}
          onChange={(e) => {
            if (e.target.value === "") {
              alert("Please select a valid date");
            } else {
              let year = e.target.value.slice(0, 4);
              let month = parseInt(e.target.value.slice(5, 7));
              let t = year.concat("-", month < 10 ? "0" + month : month);
              setStartMonth(t);
            }
          }}
        />
      </div>

      <div className="dashboard-container">
        {!isLoading && pieData.length === 0 ? (
          <h3>There is no data for this month</h3>
        ) : (
          <>
            <div className="dashboard-chart">
              <SingleTagPie pieLabels={pieLabels} pieTotals={pieTotals} />
            </div>
            <div className="dashboard-details">
              <div className="dashboard-header">Detail</div>
              {pieData.map((item, idx) => {
                return (
                  <div className="dashboard-detail" key={idx}>
                    <div className="dashboard-detail-title">
                      {item.tag.toUpperCase()}
                    </div>
                    <div className="dashboard-detail-content">{item.total}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="dashboard-container">
        <div className="dashboard-chart">
          <MonthBalanceChart days={days} expenses={expenses} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
