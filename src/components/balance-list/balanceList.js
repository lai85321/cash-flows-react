import "./balanceList.css";
const BalanceList = (props) => {
  const { date, details } = props;
  return (
    <div className="balance-list">
      <div className="balance-list-header">
        <div className="balance-list-date">{date.slice(4,15)}</div>
      </div>
      <hr></hr>
      {details.map((item, idx) => {
        return (
          <>
            <div className="balance-list-details">
              <div className="balance-list-detail">{item}</div>
              <button className="balance-list-settle">settle up</button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default BalanceList;
