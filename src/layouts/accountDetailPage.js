import AccountDetail from "../components/account-detail/accountDetail";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;

function AccountDetailPage() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccountDetail = (id) => {
      fetch(
        `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts/detail?id=${id}`,
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
          setAccount(response.data);
        });
    };

    fetchAccountDetail(id);
  }, [id, navigate]);

  return (
    <div>
      <AccountDetail account={account} />
    </div>
  );
}

export default AccountDetailPage;
