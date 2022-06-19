import "./account-list.css";
const AmountList = (props) => {
  const { date, total, details } = props;

  return (
    <div className="list">
      <div className="header">
        <div className="date">{date}</div>
        <div className="total">{total}</div>
      </div>
      <hr></hr>
      {details.map((item, index) => {
        return (
          <div className="details">
            <div className="item">
              <div className={`tag ${item.tag}`}></div>
              {item.note}
            </div>
            <div className="amount">{item.amount}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AmountList;
