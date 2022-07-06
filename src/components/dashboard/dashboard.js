import "./dashboard.css";
import React from "react";
import SingleTagPie from "../chart/pieChart";
import MonthBalanceChart from "../chart/lineChart";
const Dashboard = (props) => {
  const { pieData, days, expenses, startMonth, setStartMonth } = props;
  const pieLabels = pieData.map((item, idx) => item.tag);
  const pieTotals = pieData.map((item, idx) => item.total);

  return (
    <div className="dashboards-container">
      <div className="dashboards-month">
        <input
          type="month"
          value={startMonth}
          onChange={(e) => {
            let year = e.target.value.slice(0, 4);
            let month = parseInt(e.target.value.slice(5, 7));
            let t = year.concat("-", month < 10 ? "0" + month : month);
            setStartMonth(t);
          }}
        />
      </div>
      <div className="dashboard-container">
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
      </div>
      <div className="dashboard-container">
        <div className="dashboard-chart">
          {/* <StackedDailyChart
            className="lineChart"
            dates={dates}
            totals={totals}
            memberData={memberData}
          /> */}
          <MonthBalanceChart days={days} expenses={expenses} />
        </div>
        {/* <div className="dashboard-details">
          <div className="dashboard-header">Detail</div>
        </div> */}
      </div>
    </div>
  );
};
export default Dashboard;
