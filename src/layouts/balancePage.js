import Menu from "../components/menu/menu";
import Nav from "../components/nav/nav";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Balance from "../components/balance/balance";

const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;
function BalancePage() {
  let {bookId} = useParams()
  const userId = localStorage.getItem("id")
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
    fetchBalanceList(bookId, userId);
    fetchGroupBalanceList(bookId, userId);
  }, [bookId, userId]);
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
