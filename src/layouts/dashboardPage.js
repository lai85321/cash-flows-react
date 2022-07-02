import Menu from "../components/menu/menu";
import Nav from "../components/nav/nav";
import Dashboard from "../components/dashboard/dashboard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

function DashboardPage() {
  let { bookId } = useParams();
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const startTime = year.concat("-", month);
  const [pieData, setPieData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const fetchPieChart = (bookId, startTime) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/dashboard/singleTagPie?bookId=${bookId}&startTime=${startTime}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setPieData(response.data);
      });
  };
  useEffect(() => {
    fetchPieChart(bookId, startTime);
  }, [bookId, startTime]);

  const fetchMemberData = (bookId, startTime) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts/member?bookId=${bookId}&startTime=${startTime}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
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

  const fetchChartData = (bookId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/dashboard/singleMemberDaily?bookId=${bookId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
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
  const dates = chartData.map((item, index) => item.date);
  const totals = [];

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
      <Dashboard
        pieData={pieData}
        dates={dates}
        totals={totals}
        memberData={memberData}
      />
    </div>
  );
}

export default DashboardPage;
