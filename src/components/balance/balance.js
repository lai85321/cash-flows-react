import "./balance.css";
import BalanceList from "../balance-list/balanceList";
const Balance = (props) => {
  const { userBalance, groupBalance, balanceList } = props;
  console.log(groupBalance);
  console.log(userBalance);
  return (
    <div className="balance">
      <div className="balance-left">
        {balanceList.map((item, idx) => (
          <BalanceList date={item.date} details={item.details} />
        ))}
      </div>
      {/* 用頁面判斷(多本or單一)決定要不要顯示右邊 */}
      <div className="balance-right">
        <div className="balance-only-user">
          <div className="balance-only-user-header">Your Balance</div>
          <hr></hr>
          {userBalance.map((item) => {
            return (
              <div className="balance-only-user-contents">
                <div className="balance-only-user-content">
                  <div className="balance-only-user-detail">{item}</div>
                  <div className="balance-only-user-btn">
                    <button className="balance-only-user-settle">
                      settle up
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="balance-users">
          <div className="balance-users-header">Group Balance</div>
          <hr></hr>

          {groupBalance.map((item, idx) => {
            return (
              <div className="balance-users-contents">
                <div className="balance-users-content">
                  <div className="balance-users-name">{item.name}</div>
                  {item.balance.details.map((detail, idx) => {
                    return <div className="balance-users-detail">{detail}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Balance;
