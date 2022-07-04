import "./account-list.css";
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
          <div
            style={{
              cursor:
                item.status !== 2 || item.tag === "balanced"
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            <Link
              to={`/book/${bookId}/account/${item.id}`}
              state={{ bookId: bookId }}
              style={{
                pointerEvents:
                  item.status !== 2 || item.tag === "balanced"
                    ? "none"
                    : "auto",
                // cursor:
                //   item.status !== 2 || item.tag === "balanced"
                //     ? "not-allowed"
                //     : "pointer",
              }}
            >
              <div key={index} className="account-list-details">
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
          </div>
        );
      })}
    </div>
  );
};

export default AmountList;
