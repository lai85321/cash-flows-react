import "./account.css";
import AmountList from "../account-list/account-list";
const Account = () => {
  const counters = Array.from({ length: 3 }, (_, index) => index);
  // const detailData = [{
  //     date, total, amount, detail
  // }]
  return (
    <div className="account">
      <div className="left">
        <div className="chart">Chart</div>
        <div className="lists">
          {counters.map((item, index) => (
            <AmountList />
          ))}
        </div>
      </div>
      {/* 用頁面判斷(多本or單一)決定要不要顯示右邊 */}
      <div className="right">
        <div className="note">NOTE</div>
        <div className="member">Member</div>
      </div>
    </div>
  );
};

export default Account;
