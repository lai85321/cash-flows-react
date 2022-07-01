import "./account-list.css";
import { Link, useNavigate } from "react-router-dom";

const AmountList = (props) => {
  const { bookId, date, total, details } = props;
  const navigate = useNavigate();
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
          <Link to={`/account/detail/${item.id}`} state={{ bookId: bookId }}>
            <div className="account-list-details">
              <div className="account-list-item">
                <div className={`account-list-tag ${item.tag}`}></div>
                {item.note}
              </div>
              <div>{item.name}</div>
              <div className="account-list-amount">{item.amount}</div>
              <div
                className="account-list-status"
                style={{ backgroundColor: `${status[item.status]}` }}
              ></div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AmountList;
