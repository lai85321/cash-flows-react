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
  const { account, isLoading } = props;
  const REACT_APP_HOST = process.env.REACT_APP_HOST;
  const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;

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
          navigate(`/signIn`, { replace: true });
        }
        return response.json();
      })
      .then(() => {
        navigate(`/book/${bookId}`, { replace: true });
      });
  };

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
            {!isLoading && account?.paidName}
          </div>
          <div className="account-detail">
            <label className="account-detail-label">Note</label>
            {!isLoading && account?.note}
          </div>
          <div className="account-detail">
            <label className="account-detail-label">Tag</label>
            {!isLoading && account?.tag}
          </div>
          <div className="account-detail">
            <label className="account-detail-label">Date</label>
            {!isLoading && new Date(account?.date).toString().slice(4, 25)}
          </div>
          <div
            className="account-detail-split-container"
            style={{
              display: `${
                !isLoading && account?.splits === undefined ? "none" : "flex"
              }`,
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

        {!isLoading &&
          (account?.splits === undefined ? (
            <div className="account-detail-btns">
              <div className="account-detail-check-cancel" onClick={() => {}}>
                <Link to={`/book/${bookId}`}>Cancal</Link>
              </div>
              <div
                className="account-detail-check-remove"
                onClick={() => {
                  deleteAccount();
                }}
              >
                Remove
              </div>
            </div>
          ) : (
            <div className="account-detail-btns">
              <div className="account-detail-check-cancel" onClick={() => {}}>
                <Link to={`/book/${bookId}`}>Cancal</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AccountDetail;
