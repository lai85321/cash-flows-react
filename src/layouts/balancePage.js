import Menu from "../components/menu/menu";
import Nav from "../components/nav/nav";
import { useState, useEffect } from "react";
import Balance from "../components/balance/balance";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;
function BalancePage() {
  const bookId = 1;
  const userId = 1;
  const [balanceList, setBalanceList] = useState([]);
  const [groupBalance, setGroupBalance] = useState([]);
  const [userBalance, setUserBalance] = useState([]);

  const fetchBalanceList = (bookId, userId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/balance?bookId=${bookId}&userId=${userId}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setBalanceList(response.data);
      });
  };
  useEffect(() => {
    fetchBalanceList(bookId, userId);
  }, []);
  const fetchGroupBalanceList = (bookId, userId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/balance/group?&bookId=${bookId}&userId=${userId}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setGroupBalance(response.data.groupBalance);
        setUserBalance(response.data.userBalance);
        console.log(response.data.groupBalance);
        console.log(38);
        console.log(response.data.userBalance);
      });
  };
  useEffect(() => {
    fetchGroupBalanceList(bookId, userId);
  }, []);
  return (
    <div>
      <Menu />
      <Nav />
      <Balance
        balanceList={balanceList}
        groupBalance={groupBalance}
        userBalance={userBalance}
      />
    </div>
  );
}

export default BalancePage;
