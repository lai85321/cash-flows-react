import "./account.css";
import AmountList from "../account-list/account-list";
import React from "react";
import user from "../../images/user.png";
import { AddMemberModal } from "../modal/modal";
const { REACT_APP_CLOUDFRONT_PATH } = process.env;
const Account = (props) => {
  const {
    data,
    bookId,
    daily,
    memberData,
    setMemberData,
    startMonth,
    setStartMonth,
  } = props;
  return (
    <div className="account">
      <div className="left">
        <input
          type="month"
          value={startMonth}
          onChange={(e) => {
            let year = e.target.value.slice(0, 4);
            let month = parseInt(e.target.value.slice(5, 7));
            let t = year.concat("-", month < 10 ? "0" + month : month);
            setStartMonth(t);
          }}
        />
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
          <div className="account-overview-header">Overview</div>
          <div className="account-overview-contents">
            <div className="account-overview-content">
              <div>Income:</div> <div>{data.income}</div>
            </div>
            <div className="account-overview-content">
              <div>Expense:</div> <div>{data.expense}</div>
            </div>
            <div className="account-overview-content">
              <div>Balance:</div> <div>{data.balance}</div>
            </div>
          </div>
        </div>
        <div className="account-member">
          <div className="account-member-header">Member</div>
          <div className="account-member-lists">
            {memberData.map((item, idx) => {
              const picture = item.picture
                ? `${REACT_APP_CLOUDFRONT_PATH}/user/${item.id}/${item.picture}`
                : user;
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
                    payment: {item.payment}
                  </div>
                </>
              );
            })}
            {/* <div className="account-member-footer">
              <AddMemberModal setMemberData={setMemberData} />
            </div> */}
          </div>
          <div className="account-member-footer">
            <AddMemberModal setMemberData={setMemberData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
