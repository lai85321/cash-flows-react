import "./balanceList.css";
const BalanceList = (props) => {
  const { bookId, date, details, fetchSettleUpResult } = props;
  return (
    <div className="balance-list">
      <div className="balance-list-header">
        <div className="balance-list-date">{date.slice(4, 15)}</div>
      </div>
      <hr></hr>
      {details.map((item, idx) => {
        return (
          <>
            <div className="balance-list-details" key={idx}>
              <div className="balance-list-detail">{item.detail}</div>
              <button
                className="balance-list-settle"
                onClick={() => fetchSettleUpResult(bookId, item.splitId)}
              >
                settle up
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default BalanceList;
