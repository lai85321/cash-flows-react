import "./accountDetail.css";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
const AccountDetail = (props) => {
  const location = useLocation();
  let { bookId } = location.state;
  let navigate = useNavigate();
  let { id } = useParams();
  const userId = localStorage.getItem("id");
  const { account } = props;
  const REACT_APP_HOST = process.env.REACT_APP_HOST;
  const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;
  console.log(account);

  const deleteAccount = () => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts?id=${id}&bookId=${bookId}&userId=${userId}`,
      {
        method: "DELETE",
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
      .then((json) => {
        console.log(json);
        navigate(`/book/${bookId}`, { replace: true });
      });
  };
  const checkBtns = [
    {
      text: "Cancel",
      class: "account-detail-check-cancel",
      onClick: () => {},
    },
    {
      text: "Remove",
      class: "account-detail-check-remove",
      onClick: deleteAccount,
    },
  ];
  return (
    <div className="account-detail-page">
      <div className="account-detail-container">
        <div className="account-detail-header">
          <div className="account-detail-header-text">Account Detail</div>
        </div>
        <div className="account-detail-body">
          <div className="account-detail-amount">
            <label className="account-detail-label">Amount</label>
            {account?.amount}
          </div>
          <div className="account-detail">
            <label className="account-detail-label">Paid by</label>
            {account?.paidName}
          </div>
          <div className="account-detail">
            <label className="account-detail-label">Note</label>
            {account?.note}
          </div>
          <div className="account-detail">
            <label className="account-detail-label">Tag</label>
            {account?.tag}
          </div>
          <div className="account-detail">
            <label className="account-detail-label">Date</label>
            {new Date(account?.date).toLocaleString("zh-TW", {
              timeZone: "Asia/Taipei",
            })}
          </div>

          <div
            className="account-detail-split-container"
            style={{
              display: `${account?.splits === undefined ? "none" : "flex"}`,
            }}
          >
            <label className="account-detail-label">Split</label>
            <div className="account-detail-split">
              {account &&
                account.splits &&
                account.splits.map((item, idx) => {
                  return (
                    <div key={idx}>
                      {item.splitName}: {item.split}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="account-detail-btns">
          {checkBtns.map((item, index) => (
            <div key={index} className={item.class} onClick={item.onClick}>
              {item.text === "Cancel" ? (
                <Link to={`/book/${bookId}`}>{item.text}</Link>
              ) : (
                item.text
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
