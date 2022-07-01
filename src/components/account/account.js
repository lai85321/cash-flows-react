import "./account.css";
import AmountList from "../account-list/account-list";
import React from "react";
import user from "../../images/user.png";
import { AddMemberModal } from "../modal/modal";
const Account = (props) => {
  const { data, bookId, daily, memberData, setMemberData } = props;

  return (
    <div className="account">
      <div className="left">
        <div className="lists">
          {daily.map((item, index) => (
            <AmountList
              key={index}
              bookId={bookId}
              date={item.date}
              total={item.total}
              details={item.details}
            />
          ))}
        </div>
      </div>
      {/* 用頁面判斷(多本or單一)決定要不要顯示右邊 */}
      <div className="right">
        <div className="account-overview">
          <div className="account-overview-header">Expense</div>
          <div className="account-overview-contents">
            {/* <div className="account-overview-content">
              <div className="account-overview-title">Income</div>
              <div className="account-overview-amount">{data.income}</div>
            </div> */}
            <div className="account-overview-content">{data.expense}</div>
            {/* <div className="account-overview-content">
              <div className="account-overview-title">Expense</div>
              <div className="account-overview-amount">{data.expense}</div>
            </div> */}
            {/* <div className="account-overview-content">
              <div className="account-overview-title">Balance</div>
              <div className="account-overview-amount">{data.balance}</div>
            </div> */}
          </div>
        </div>
        <div className="account-member">
          <div className="account-member-header">Member</div>
          <div className="account-member-lists">
            {memberData.map((item, idx) => {
              const picture = item.picture || user;
              return (
                <>
                  <div key={idx} className="account-member-list">
                    <div
                      className="account-member-picture"
                      style={{ backgroundImage: `url(${picture})` }}
                    ></div>
                    <div className="account-member-name">{item.name}</div>
                  </div>

                  <div style={{ margin: "5px 0px" }}>
                    expense: {item.expense}
                  </div>
                </>
              );
            })}
            <div className="account-member-footer">
              {/* <div className="account-add-member"></div> */}
              <AddMemberModal setMemberData={setMemberData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
