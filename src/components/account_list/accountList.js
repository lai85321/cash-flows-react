import "./accountList.css";
import { Link } from "react-router-dom";

const AmountList = (props) => {
  const { bookId, date, total, details } = props;
  const status = ["red", "green", "none"];

  return (
    <div className="account-list-list">
      <div className="account-list-header">
        <div className="account-list-date">{date}</div>
        <div className="account-list-total">{total}</div>
      </div>
      <hr></hr>
      {details.map((item, index) => {
        return (
          <div key={index}>
            <Link
              to={`/book/${bookId}/account/${item.id}`}
              state={{ bookId: bookId }}
            >
              <div key={index} className="account-list-details">
                <div className="account-list-item">
                  <div className={`account-list-tag ${item.tag}`}></div>
                  {item.note}
                </div>
                <div className="account-list-name">{item.name}</div>
                <div className="account-list-amount">{item.amount}</div>
                <div
                  className="account-list-status"
                  style={{ backgroundColor: `${status[item.status]}` }}
                ></div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AmountList;
