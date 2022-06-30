import Menu from "../components/menu/menu";
import Nav from "../components/nav/nav";
import Account from "../components/account/account";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

function AccountPage() {
  let { bookId } = useParams();
  const userId = localStorage.getItem("id");
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const startTime = year.concat("-", month);
  const [data, setData] = useState([]);
  const [daily, setDaily] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [memberData, setMemberData] = useState([]);

  const fetchAccountList = (userId, bookId, startTime) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts?userId=${userId}&bookId=${bookId}&startTime=${startTime}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setData(response.data);
        setDaily(response.data.daily);
      });
  };
  useEffect(() => {
    fetchAccountList(userId, bookId, startTime);
  }, [userId, bookId, startTime]);

  const fetchChartData = (bookId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/dashboard/singleMemberDaily?bookId=${bookId}`
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
  }, [bookId]);

  const fetchMemberData = (bookId, startTime) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts/member?bookId=${bookId}&startTime=${startTime}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setMemberData(response.data);
      });
  };

  useEffect(() => {
    fetchMemberData(bookId, startTime);
  }, [bookId, startTime]);
  console.log(chartData);
  const dates = chartData.map((item, index) => item.date);
  console.log(dates);
  const totals = [];
  console.log(memberData);

  for (let i = 0; i < memberData.length; i++) {
    let member = memberData[i];
    console.log(member.id);
    let tmps = chartData.map((item, idx) => {
      console.log(item);
      return Object.values(item.total[i])[0];
    });
    totals.push(tmps);
  }
  console.log(totals);
  return (
    <div>
      <Menu />
      <Nav />
      <Account
        daily={daily}
        data={data}
        dates={dates}
        totals={totals}
        memberData={memberData}
        setMemberData={setMemberData}
      />
    </div>
  );
}

export default AccountPage;
