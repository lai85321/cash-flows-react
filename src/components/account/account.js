import "./account.css";
import AmountList from "../account_list/accountList";
import React from "react";
import user from "../../images/user.png";
import { AddMemberModal, EditBudgetModel } from "../modal/modal";
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
    budget,
    setBudget,
    isLoading,
  } = props;
  return (
    <div className="account">
      <div className="left">
        <div className="account-month">
          <input
            type="month"
            className="account-month-input"
            value={startMonth}
            onChange={(e) => {
              if (e.target.value === "") {
                alert("Please select a valid date");
              } else {
                let year = e.target.value.slice(0, 4);
                let month = parseInt(e.target.value.slice(5, 7));
                let t = year.concat("-", month < 10 ? "0" + month : month);
                setStartMonth(t);
              }
            }}
          />
        </div>
        <div className="lists">
          {!isLoading && daily.length === 0 ? (
            <>
              <h3>There is no data for this month</h3>
            </>
          ) : (
            daily.map((item, index) => (
              <AmountList
                key={index}
                bookId={bookId}
                date={item.date}
                total={item.total}
                details={item.details}
              />
            ))
          )}
        </div>
      </div>
      <div className="right">
        <div className="account-budget">
          <div className="account-budget-header">Budget</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className="budget-amount">Budget: {budget}</div>
            <div className="budget-change">
              <EditBudgetModel
                bookId={bookId}
                budget={budget}
                setBudget={setBudget}
              />
            </div>
          </div>
          <div className="budget-left">
            Budget left: {parseInt(budget) + parseInt(data.expense)}
          </div>
          <div className="budget-container">
            <div className="budget-bar-container">
              <div
                className="budget-bar "
                style={{
                  backgroundColor: "#4CAF50",
                  width:
                    parseInt(budget) + parseInt(data.expense) <= 0
                      ? "100%"
                      : `${
                          -1 * (parseInt(data.expense) / parseInt(budget)) * 100
                        }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
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
                <div key={idx}>
                  <div className="account-member-list">
                    <div
                      className="account-member-picture"
                      style={{ backgroundImage: `url(${picture})` }}
                    ></div>
                    <div className="account-member-name">{item.name}</div>
                  </div>
                  <div style={{ margin: "5px 0px" }}>
                    payment: {item.payment}
                  </div>
                </div>
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
