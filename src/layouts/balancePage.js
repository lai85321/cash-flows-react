import Menu from "../components/menu/menu";
import Nav from "../components/nav/nav";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Balance from "../components/balance/balance";

const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;
function BalancePage() {
  let navigate = useNavigate();
  let { bookId } = useParams();
  const userId = localStorage.getItem("id");
  const [balanceList, setBalanceList] = useState([]);

  const fetchGroupBalanceList = (bookId, userId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/balance/group?&bookId=${bookId}&userId=${userId}`,
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
        setBalanceList(response.data);
      });
  };

  const fetchSettleUpResult = (bookId, splitId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/balance/settle?userId=${userId}&bookId=${bookId}&splitId=${splitId}`,
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
        setBalanceList(response.data);
      });
  };
  useEffect(() => {
    const fetchBalanceList = (bookId, userId) => {
      fetch(
        `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/balance?bookId=${bookId}&userId=${userId}`,
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
          setBalanceList(response.data);
        });
    };

    fetchBalanceList(bookId, userId);
  }, [bookId, userId, navigate]);
  return (
    <div>
      <Menu />
      <Nav />
      <Balance
        bookId={bookId}
        userId={userId}
        balanceList={balanceList}
        fetchGroupBalanceList={fetchGroupBalanceList}
        fetchSettleUpResult={fetchSettleUpResult}
      />
    </div>
  );
}

export default BalancePage;
