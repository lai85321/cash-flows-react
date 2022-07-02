import "./addAccount.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { PaidModal } from "../modal/modal";
const AddAccount = () => {
  let navigate = useNavigate();
  const REACT_APP_HOST = process.env.REACT_APP_HOST;
  const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;
  let { bookId } = useParams();
  const username = localStorage.getItem("username");
  const typeBtns = ["Income", "Expense"];
  const tags = ["food", "cloth", "health"];
  const userOptions = [
    { id: "1", name: "Andy" },
    { id: "2", name: "Bella" },
    { id: "3", name: "Cindy" },
  ];

  const paidAmount = Array(userOptions.length).fill(0);
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [tag, setTag] = useState("food");
  const [type, setType] = useState("Expense");
  const [note, setNote] = useState("");
  const [split, setSplit] = useState(0);
  const [paidBtnShow, setPaidBtnShow] = useState(username);
  // const [splitBtnShow, setSplitBtnShow] = useState("Split");
  const [paid, setPaid] = useState(paidAmount);
  const submitAccount = () => {
    const typeId = typeBtns.findIndex((item) => item === type);
    const tagId = tags.findIndex((item) => item === tag);
    const paidIdx = userOptions.findIndex((item) => item.name === paidBtnShow);
    const body = {
      bookId: bookId,
      userId: userOptions[paidIdx].id,
      typeId: typeId + 1,
      amount: amount,
      note: note,
      tagId: tagId + 1,
      date: startDate,
      split: split,
      paidId: split && +userOptions[paidIdx].id,
      splits: paid,
    };

    fetch(`${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigate(`/book/${bookId}`, { replace: true });
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
                  let sum = 0;
                  paidAmount.fill(
                    Math.trunc(e.target.value / userOptions.length),
                    0,
                    userOptions.length - 1
                  );
                  for (let i = 0; i < paidAmount.length - 1; i++) {
                    sum = sum + paidAmount[i];
                  }
                  paidAmount.fill(e.target.value - sum, userOptions.length - 1);
                  setPaid(paidAmount);
                }}
              />
            </div>
            <div className="add-account-input">
              <label className="add-label">Paid by</label>
              <select
                className="add-note-input"
                value={paidBtnShow}
                defaultValue={paidBtnShow}
                onChange={(e) => setPaidBtnShow(e.target.value)}
              >
                {userOptions.map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
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
            {/* <div style={{ marginTop: "10px", marginLeft: "8%" }}> */}
            <div style={{ display: "flex", alignItem: "center" }}>
              <label className="add-split-label">Split Account</label>
              <label className="switch" onChange={() => setSplit(split ^ 1)}>
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>

              <div className={`split-detail ${split === 0 && "none"}`}>
                {userOptions.map((item, idx) => (
                  <div>
                    <div
                      style={{
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <label
                        style={{
                          width: "48px",
                          display: "inline-block",
                        }}
                      >
                        {item.name}
                      </label>
                      <input
                        style={{
                          height: "40%",
                          width: "48px",
                          marginLeft: "10px",
                        }}
                        value={paid[idx]}
                        onChange={(e) => {
                          let newPaid = [...paid]; // copying the old datas array
                          newPaid[idx] = e.target.value;
                          setPaid(newPaid);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* </div> */}
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
          </div>
        </div>
        <div className="add-btns">
          <div className="add-btns-left"></div>
          <div className="add-btns-right">
            <div className="add-check">
              {checkBtns.map((item, index) => (
                <div key={index} className={item.class} onClick={item.onClick}>
                  {item.text === "Cancel" ? (
                    <Link to={`/book/${bookId}`}>{item.text}</Link>
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
