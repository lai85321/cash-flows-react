import "./account.css";
import AmountList from "../account-list/account-list";
import React from "react";
import SingleDailyChart from "../chart/chart";

const Account = (props) => {
  const { data, daily, dates, totals } = props;
  return (
    <div className="account">
      <div className="left">
        <div className="chart">
          <div style={{ width: "80%", height: "80%" }}>
            <SingleDailyChart
              className="lineChart"
              dates={dates}
              totals={totals}
            />
          </div>
        </div>
        <div className="lists">
          {daily.map((item, index) => (
            <AmountList
              key={index}
              date={item.date}
              total={item.total}
              details={item.details}
            />
          ))}
        </div>
      </div>
      {/* 用頁面判斷(多本or單一)決定要不要顯示右邊 */}
      <div className="right">
        <div className="account-overview">
          <div className="account-overview-header">Overview</div>
          <div className="account-overview-contents">
            <div className="account-overview-content">
              <div className="account-overview-title">Income</div>
              <div className="account-overview-amount">{data.income}</div>
            </div>
            <div className="account-overview-content">
              <div className="account-overview-title">Expense</div>
              <div className="account-overview-amount">{data.expense}</div>
            </div>
            <div className="account-overview-content">
              <div className="account-overview-title">Balance</div>
              <div className="account-overview-amount">{data.balance}</div>
            </div>
          </div>
        </div>
        <div className="member">Member</div>
      </div>
    </div>
  );
};

export default Account;
