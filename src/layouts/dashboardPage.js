import Menu from "../components/menu/menu";
import Nav from "../components/nav/nav";
import Dashboard from "../components/dashboard/dashboard";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

function DashboardPage() {
  let navigate = useNavigate();
  let { bookId } = useParams();
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const startTime = year.concat("-", month < 10 ? "0" + month : month);
  const [startMonth, setStartMonth] = useState(startTime);
  const [pieData, setPieData] = useState([]);
  const [days, setDays] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchPieChart = (bookId, startTime) => {
      const utcStart = new Date(startTime).setHours(
        new Date(startTime).getHours() - 8
      );
      fetch(
        `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/dashboard/singleTagPie?bookId=${bookId}&startTime=${utcStart}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 401) {
            // alert("Please log in");
            navigate(`/signIn`, { replace: true });
          }
          return response.json();
        })
        .then((response) => {
          setPieData(response.data);
        });
    };
    const fetchMonthBalanceData = (bookId, startTime) => {
      const utcStart = new Date(startTime).setHours(
        new Date(startTime).getHours() - 8
      );

      fetch(
        `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/dashboard/monthBalance?bookId=${bookId}&startTime=${utcStart}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 401) {
            // alert("Please log in");
            navigate(`/signIn`, { replace: true });
          }
          return response.json();
        })
        .then((response) => {
          setDays(response.data.days);
          setExpenses(response.data.expenses);
        });
    };
    fetchPieChart(bookId, startMonth);
    fetchMonthBalanceData(bookId, startMonth);
  }, [bookId, startMonth, navigate]);
  return (
    <div>
      <Menu />
      <Nav />
      <Dashboard
        pieData={pieData}
        days={days}
        expenses={expenses}
        startMonth={startMonth}
        setStartMonth={setStartMonth}
      />
    </div>
  );
}

export default DashboardPage;
