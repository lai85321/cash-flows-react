import Menu from "../components/menu/menu";
import Nav from "../components/nav/nav";
import Account from "../components/account/account";
import { useEffect, useState } from "react";

const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

function AccountPage() {
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
    <div>
      <Menu />
      <Nav />
      <Account daily={daily} data={data} dates={dates} totals={totals} />
    </div>
  );
}

export default AccountPage;
