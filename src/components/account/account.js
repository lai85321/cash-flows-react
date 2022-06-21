import "./account.css";
import AmountList from "../account-list/account-list";
import React from "react";
import { useEffect, useState } from "react";
import SingleDailyChart from "../chart/chart";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

const Account = () => {
  const userId = 1;
  const bookId = 1;
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const fetchAccountList = (userId, bookId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts?userId=${userId}&bookId=${bookId}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setData(response.data);
      });
  };
  useEffect(() => {
    fetchAccountList(userId, bookId);
  }, []);

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
          {data.map((item, index) => (
            <AmountList
              date={item.date}
              total={item.total}
              details={item.details}
            />
          ))}
        </div>
      </div>
      {/* 用頁面判斷(多本or單一)決定要不要顯示右邊 */}
      <div className="right">
        <div className="note">NOTE</div>
        <div className="member">Member</div>
      </div>
    </div>
  );
};

export default Account;
