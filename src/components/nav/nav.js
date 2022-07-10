import "./nav.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;
function Nav() {
  let { bookId } = useParams();
  let navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [notice, setNotice] = useState(0);
  const [message, setMessage] = useState([]);
  const updateNoticeStatus = (userId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/message?userId=${userId}`,
      {
        method: "PATCH",
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
      .then((response) => {});
  };
  useEffect(() => {
    const fetchNoticeMsg = (userId) => {
      setIsLoading(true);
      fetch(
        `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/message?userId=${userId}`,
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
          setNotice(response.data.notice);
          setMessage(response.data.detail);
          setIsLoading(false);
        });
    };

    fetchNoticeMsg(userId);
  }, [userId, navigate]);
  return (
    <div className="nav-container">
      <div className="nav">
        <div className="book-icon"></div>
        <div className="nav-lists">
          <Link to={`/book/${bookId}`}>
            <div className="nav-list">Account</div>
          </Link>
          <Link to={`/book/${bookId}/balance`}>
            <div className="nav-list">Balance</div>
          </Link>
          <Link to={`/book/${bookId}/dashboard`}>
            <div className="nav-list">Dashboard</div>
          </Link>
        </div>
      </div>
      <div className="nav-right">
        <Link to={`/addAccount/${bookId}`}>
          <div className="btn">Record Payment</div>
        </Link>

        <div
          className="nav-notice"
          onClick={() => {
            setShowMessage(!showMessage);
            if (notice === 0) {
              updateNoticeStatus(userId);
              setNotice(1);
            }
          }}
        >
          {!isLoading && (
            <span
              className="badge"
              style={{ display: `${notice === 0 ? "block" : "none"}` }}
            ></span>
          )}
        </div>
        <div
          className="nav-notice-message"
          style={{
            display: `${showMessage === true ? "block" : "none"}`,
          }}
        >
          <div className="nav-notice-message-title">Notifications</div>
          {message.map((item, idx) => {
            if (item.amount > 0) {
              return (
                <div className="nav-notice-message-section">
                  <div className="nav-notice-message-settleMsg">
                    {item.settle_name} settle up a payment in {item.book}
                  </div>
                  <div
                    className="nav-notice-message-paidMsg"
                    style={{ color: "green" }}
                  >
                    {item.paid_name} paid you {item.amount}
                  </div>
                  <div className="nav-notice-message-time">
                    {item.timestamp}
                  </div>
                </div>
              );
            } else {
              return (
                <div className="nav-notice-message-section">
                  <div className="nav-notice-message-settleMsg">
                    {item.settle_name} settle up a payment in {item.book}
                  </div>
                  <div
                    className="nav-notice-message-paidMsg"
                    style={{ color: "red" }}
                  >
                    {item.paid_name} received {-1 * parseInt(item.amount)} from
                    you
                  </div>
                  <div className="nav-notice-message-time">
                    {item.timestamp}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Nav;
