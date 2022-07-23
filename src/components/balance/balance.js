import "./balance.css";
import BalanceList from "../balance_list/balanceList";
const Balance = (props) => {
  const {
    balanceList,
    fetchGroupBalanceList,
    fetchSettleUpResult,
    bookId,
    userId,
    isLoading,
  } = props;

  return (
    <div className="balance">
      <div className="balance-left">
        {!isLoading && balanceList.length === 0 ? (
          <h3>All payments have been settled up</h3>
        ) : (
          balanceList.map((item, idx) => (
            <BalanceList
              key={idx}
              bookId={bookId}
              date={item.date}
              details={item.details}
              fetchSettleUpResult={fetchSettleUpResult}
            />
          ))
        )}
        <button
          className="balance-group-balance-btn"
          onClick={() => fetchGroupBalanceList(bookId, userId)}
        >
          Get Group Balance
        </button>
      </div>
      {/* 用頁面判斷(多本or單一)決定要不要顯示右邊 */}
      <div className="balance-right"></div>
    </div>
  );
};

export default Balance;
