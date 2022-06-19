import "./addAccount.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddAccount = () => {
  const typeBtns = ["Income", "Expense"];
  const tags = ["food", "cloth", "health"];

  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState();
  const [tag, setTag] = useState("food");
  const [type, setType] = useState("Income");
  const [note, setNote] = useState();
  const [split, setSplit] = useState(0);
  const submitAccount = () => {
    const body = {
      type: type,
      amount: amount,
      note: note,
      tag: tag,
      date: startDate,
    };
    console.log(body);
  };
  const checkBtns = [
    {
      text: "Cancel",
      class: "add-check-cancel",
      onClick: () => {},
    },
    {
      text: "Save",
      class: "add-check-save",
      onClick: submitAccount,
    },
  ];
  return (
    <div className="add-container">
      <div className="add-page">
        <div className="add-header">
          <div className="add-header-icon"></div>
          <div className="add-header-text">Add New Account</div>
        </div>
        <hr></hr>
        <div className="add-account-type">
          {typeBtns.map((item, index) => (
            <div
              key={index}
              className={`add-account-type-button ${
                type === item && "chosenBtn"
              }`}
              onClick={(e) => setType(e.target.textContent)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="add-body">
          <div className="add-left">
            <div className="add-account-input">
              <label className="add-amount-label">Amount</label>
              <input
                className="add-amount-input"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <div className="add-account-input">
              <label className="add-label">Note</label>
              <textarea
                className="add-note-input"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              ></textarea>
            </div>
            <div style={{ marginTop: "30px" }}>
              <div className="add-account-input">
                <label className="add-label">Tag</label>
                <div className="add-tag-container">
                  {tags.map((item, index) => (
                    <div
                      key={index}
                      className={`add-tag ${tag === item && "chosenBtn"}`}
                      onClick={(e) => setTag(e.target.textContent)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              <label
                className={`add-split ${split !== 0 && "chosenBtn"}`}
                onClick={() => setSplit(split ^ 1)}
              >
                Split Account
              </label>
              <div className={`split-detail ${split === 0 && "none"}`}>
                Paid by you
              </div>
            </div>
          </div>
          <div className="add-right">
            <div className="add-date">
              <label className="add-label">Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="add-check">
              {checkBtns.map((item, index) => (
                <div key={index} className={item.class} onClick={item.onClick}>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
