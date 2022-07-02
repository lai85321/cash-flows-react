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
  const [memberData, setMemberData] = useState([]);

  const fetchAccountList = (userId, bookId, startTime) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts?userId=${userId}&bookId=${bookId}&startTime=${startTime}`,
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
        setData(response.data);
        setDaily(response.data.daily);
      });
  };
  useEffect(() => {
    fetchAccountList(userId, bookId, startTime);
  }, [userId, bookId, startTime]);

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

  return (
    <div>
      <Menu />
      <Nav />
      <Account
        daily={daily}
        bookId={bookId}
        data={data}
        memberData={memberData}
        setMemberData={setMemberData}
      />
    </div>
  );
}

export default AccountPage;
