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
  const startTime = year.concat("-", month);
  const [pieData, setPieData] = useState([]);
  // const [memberData, setMemberData] = useState([]);
  // const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
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
          if (response.status === 401) {
            alert("Please log in");
            navigate(`/signIn`, { replace: true });
          }
          return response.json();
        })
        .then((response) => {
          setPieData(response.data);
        });
    };

    fetchPieChart(bookId, startTime);
  }, [bookId, startTime, navigate]);

  // useEffect(() => {
  //   const fetchMemberData = (bookId, startTime) => {
  //     fetch(
  //       `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts/member?bookId=${bookId}&startTime=${startTime}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         if (response.status === 401) {
  //           alert("Please log in");
  //           navigate(`/signIn`, { replace: true });
  //         }
  //         return response.json();
  //       })
  //       .then((response) => {
  //         setMemberData(response.data);
  //       });
  //   };
  //   fetchMemberData(bookId, startTime);
  // }, [bookId, startTime, navigate]);

  useEffect(() => {
    // const fetchChartData = (bookId) => {
    //   fetch(
    //     `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/dashboard/singleMemberDaily?bookId=${bookId}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //       },
    //     }
    //   )
    //     .then((response) => {
    //       if (response.status === 401) {
    //         alert("Please log in");
    //         navigate(`/signIn`, { replace: true });
    //       }
    //       return response.json();
    //     })
    //     .then((response) => {
    //       setChartData(response.data);
    //     });
    // };

    const fetchMonthBalanceData = (bookId) => {
      fetch(
        `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/dashboard/monthBalance?bookId=${bookId}`,
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
            alert("Please log in");
            navigate(`/signIn`, { replace: true });
          }
          return response.json();
        })
        .then((response) => {
          setDays(response.data.days);
          setExpenses(response.data.expenses);
        });
    };

    //fetchChartData(bookId);
    fetchMonthBalanceData(bookId);
  }, [bookId, navigate]);
  // const dates = chartData.map((item, index) => item.date);
  // const totals = [];

  // for (let i = 0; i < memberData.length; i++) {
  //   let member = memberData[i];
  //   console.log(member.id);
  //   let tmps = chartData.map((item, idx) => {
  //     console.log(item);
  //     return Object.values(item.total[i])[0];
  //   });
  //   totals.push(tmps);
  // }
  // console.log(totals);
  return (
    <div>
      <Menu />
      <Nav />
      <Dashboard pieData={pieData} days={days} expenses={expenses} />
    </div>
  );
}

export default DashboardPage;
