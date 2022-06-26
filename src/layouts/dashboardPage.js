import Menu from "../components/menu/menu";
import Nav from "../components/nav/nav";
import Dashboard from "../components/dashboard/dashboard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

function DashboardPage() {
  let {bookId} = useParams()
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const startTime = year.concat("-", month);
  const [pieData, setPieData] = useState([]);
  const fetchPieChart = (bookId, startTime) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/dashboard/singleTagPie?bookId=${bookId}&startTime=${startTime}`
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
  return (
    <div>
      <Menu />
      <Nav />
      <Dashboard pieData={pieData}/>
    </div>
  );
}

export default DashboardPage;
