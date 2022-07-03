import Menu from "../components/menu/menu";
import Nav from "../components/nav/nav";
import Account from "../components/account/account";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

function AccountPage() {
  let navigate = useNavigate();
  let { bookId } = useParams();
  const userId = localStorage.getItem("id");
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const startTime = year.concat("-", month);
  const [data, setData] = useState([]);
  const [daily, setDaily] = useState([]);
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
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
          if (response.status === 401) {
            alert("Please log in");
            navigate(`/signIn`, { replace: true });
          }
          return response.json();
        })
        .then((response) => {
          setData(response.data);
          setDaily(response.data.daily);
        });
    };

    fetchAccountList(userId, bookId, startTime);
  }, [userId, bookId, startTime, navigate]);

  useEffect(() => {
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
          if (response.status === 401) {
            alert("Please log in");
            navigate(`/signIn`, { replace: true });
          }
          return response.json();
        })
        .then((response) => {
          setMemberData(response.data);
        });
    };

    fetchMemberData(bookId, startTime);
  }, [bookId, startTime, navigate]);

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
