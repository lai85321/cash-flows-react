import "./addAccount.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const AddAccount = () => {
  const REACT_APP_HOST = process.env.REACT_APP_HOST;
  const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;
  const typeBtns = ["Income", "Expense"];
  const tags = ["food", "cloth", "health"];
  const userOptions = [
    { value: "1", label: "User 1" },
    { value: "2", label: "User 2" },
  ];
  const payOptions = [{ value: "equally", label: "equally" }];
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [tag, setTag] = useState("food");
  const [type, setType] = useState("Income");
  const [note, setNote] = useState("");
  const [split, setSplit] = useState(0);

  const submitAccount = () => {
    const typeId = typeBtns.findIndex((item) => item === type);
    const tagId = tags.findIndex((item) => item === tag);
    const body = {
      bookId: 1,
      userId: 1,
      typeId: typeId,
      amount: amount,
      note: note,
      tagId: tagId,
      date: startDate,
      split: 0,
    };
    fetch(`${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
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
            <div style={{ marginTop: "25px" }}>
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
            <div style={{ marginTop: "10px" }}>
              <label
                className={`add-split ${split !== 0 && "chosenBtn"}`}
                onClick={() => setSplit(split ^ 1)}
              >
                Split Account
              </label>
              <div className={`split-detail ${split === 0 && "none"}`}>
                <div style={{ margin: "2% 0%" }}>Paid by</div>{" "}
                <Select className="selector" options={userOptions} />
                <div style={{ margin: "2% 0%" }}>and split </div>
                <Select className="selector" options={payOptions} />
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
