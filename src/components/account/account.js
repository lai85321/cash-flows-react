import "./account.css";
import AmountList from "../account-list/account-list";
import React from "react";
import { useEffect, useState } from "react";
import SingleDailyChart from "../chart/chart";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

const Account = () => {
  const userId = 1;
  const bookId = 1;
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const startTime = year.concat("-", month);
  const [data, setData] = useState([]);
  const [daily, setDailyData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const fetchAccountList = (userId, bookId, startTime) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts?userId=${userId}&bookId=${bookId}&startTime=${startTime}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        //setData(response.data);
        setData(response.data);
        setDailyData(response.data.daily);
        // setData((data) => ({
        //   ...response.data,
        // }));
      });
  };
  useEffect(() => {
    fetchAccountList(userId, bookId, startTime);
  }, [startTime]);

  const fetchChartData = (bookId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/dashboard?bookId=${bookId}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setChartData(response.data);
      });
  };
  useEffect(() => {
    fetchChartData(bookId);
  }, []);

  const dates = chartData.map((item, index) => item.date);

  const totals = chartData.map((item, index) => item.total);

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
          {console.log(typeof data)}
          {console.log(data)}
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
