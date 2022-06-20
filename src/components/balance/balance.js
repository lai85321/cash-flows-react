import "./balance.css";
import { useEffect, useState } from "react";

const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

const Balance = () => {
  const bookId = 1;
  const [data, setData] = useState([]);
  const fetchBalanceList = (bookId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/balance?&bookId=${bookId}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(20);
        console.log(response);
        setData(response.data);
      });
  };
  useEffect(() => {
    fetchBalanceList(bookId);
  }, []);
  return (
    <div className="bal-container">
      {data.map((userBalance, index) => {
        return (
          <div key={index} className="bal">
            <div className="bal-user">
              <div className="bal-user-image"></div>
              <div className="bal-user-name">{userBalance.name}</div>
            </div>
            <div className="bal-details">
              {userBalance.balance.details.map((item, index) => {
                return (
                  <div key={index} className="bal-detail">
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Balance;
