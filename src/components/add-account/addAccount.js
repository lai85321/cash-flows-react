import "./addAccount.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Select from "react-select";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PaidModal, SplitModal } from "../modal/modal";
const AddAccount = () => {
  let navigate = useNavigate();
  const REACT_APP_HOST = process.env.REACT_APP_HOST;
  const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;
  const typeBtns = ["Income", "Expense"];
  const tags = ["food", "cloth", "health"];
  const userOptions = [
    { id: "1", label: "Andy" },
    { id: "2", label: "Bella" },
    { id: "3", label: "Cindy" },
  ];
  const paidAmount = [0, 0, 0];
  const splitOptions = [
    { value: "equally", label: "equally" },
    { value: "unequally", label: "unequally" },
  ];
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [tag, setTag] = useState("food");
  const [type, setType] = useState("Expense");
  const [note, setNote] = useState("");
  const [split, setSplit] = useState(0);
  const [paidBtnShow, setPaidBtnShow] = useState("Person");
  const [splitBtnShow, setSplitBtnShow] = useState("Split");
  const [paid, setPaid] = useState(paidAmount);
  const submitAccount = () => {
    const typeId = typeBtns.findIndex((item) => item === type);
    const tagId = tags.findIndex((item) => item === tag);
    const paidIdx = userOptions.findIndex((item) => item.label === paidBtnShow);
    const body = {
      bookId: 1,
      userId: 1,
      typeId: typeId + 1,
      amount: amount,
      note: note,
      tagId: tagId + 1,
      date: startDate,
      split: split,
      paidId: split && +userOptions[paidIdx].id,
      splits: paid,
    };
    console.log(body);
    fetch(`${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigate("/account", { replace: true });
      });
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
                <PaidModal
                  details={userOptions}
                  paidBtnShow={paidBtnShow}
                  setPaidBtnShow={setPaidBtnShow}
                />
                <div style={{ margin: "2% 0%" }}>and split </div>
                <SplitModal
                  amount={amount}
                  users={userOptions}
                  details={splitOptions}
                  splitBtnShow={splitBtnShow}
                  paid={paid}
                  setPaid={setPaid}
                  setSplitBtnShow={setSplitBtnShow}
                />
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
                  {item.text === "Cancel" ? (
                    <Link to="/">{item.text}</Link>
                  ) : (
                    item.text
                  )}
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
