import Menu from "../components/menu/menu";
import Nav from "../components/nav/nav";
import { useState, useEffect } from "react";
import Balance from "../components/balance/balance";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;
function BalancePage() {
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
        setData(response.data);
      });
  };
  useEffect(() => {
    fetchBalanceList(bookId);
  }, []);
  return (
    <div>
      <Menu />
      <Nav />
      <Balance data={data} />
    </div>
  );
}

export default BalancePage;
