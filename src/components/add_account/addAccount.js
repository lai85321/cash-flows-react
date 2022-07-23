import "./addAccount.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getStrLength from "../../method/getStrLength";
const AddAccount = (props) => {
  const { member } = props;
  let navigate = useNavigate();
  const REACT_APP_HOST = process.env.REACT_APP_HOST;
  const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;
  let { bookId } = useParams();
  const username = localStorage.getItem("username");
  const typeBtns = ["Income", "Expense"];
  const tags = [
    { id: 1, tag: "food" },
    { id: 2, tag: "cloth" },
    { id: 3, tag: "health" },
    { id: 5, tag: "groceries" },
    { id: 6, tag: "fare" },
    { id: 7, tag: "entertainment" },
    { id: 8, tag: "hotel" },
    { id: 9, tag: "income" },
  ];
  const expenseTags = [
    { id: 1, tag: "food" },
    { id: 2, tag: "cloth" },
    { id: 3, tag: "health" },
    { id: 5, tag: "groceries" },
    { id: 6, tag: "fare" },
    { id: 7, tag: "entertainment" },
    { id: 8, tag: "hotel" },
  ];
  const paidAmount = Array(member?.length).fill(0);
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [tag, setTag] = useState("food");
  const [type, setType] = useState("Expense");
  const [note, setNote] = useState("");
  const [split, setSplit] = useState(0);
  const [paidBtnShow, setPaidBtnShow] = useState(username);
  const [paid, setPaid] = useState(paidAmount);
  const submitAccount = () => {
    if (amount === "" || amount === "0") {
      alert("Please type an valid number in amount field");
    } else {
      const typeId = typeBtns.findIndex((item) => item === type);
      const tagId = tags.findIndex((item) => item.tag === tag);
      const paidIdx = member.findIndex((item) => item.name === paidBtnShow);
      const body = {
        bookId: bookId,
        userId: member[paidIdx].id,
        typeId: typeId + 1,
        amount: amount,
        note: note === "" ? tag : note,
        tagId: tags[tagId].id,
        date: startDate,
        split: split,
        paidId: split && +member[paidIdx].id,
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
        .then((response) => {
          if (response.status === 401) {
            // alert("Please log in");
            navigate(`/signIn`, { replace: true });
          }
          return response.json();
        })
        .then((json) => {
          if (!json.error) {
            navigate(`/book/${bookId}`, { replace: true });
          } else {
            alert(json.error);
          }
        });
    }
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
              onClick={(e) => {
                setType(e.target.textContent);
                if (e.target.textContent === "Income") {
                  setTag("income");
                }
              }}
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
                min="0"
                max="1000000"
                type="number"
                className="add-amount-input"
                value={amount}
                onChange={(e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("Minimum number is 0");
                  }
                  if (e.target.value >= 1000000) {
                    e.target.value = 1000000;
                    alert("Maximum number is 1000000");
                  }
                  setAmount(e.target.value);
                  let sum = 0;
                  paidAmount.fill(
                    Math.trunc(e.target.value / member.length),
                    0,
                    member.length - 1
                  );
                  for (let i = 0; i < paidAmount.length - 1; i++) {
                    sum = sum + paidAmount[i];
                  }
                  paidAmount.fill(e.target.value - sum, member.length - 1);
                  setPaid(paidAmount);
                }}
              />
            </div>

            <div className="add-account-input">
              <label className="add-label">
                {type === "Expense" ? "Paid by" : "Owned by"}
              </label>
              <select
                className="add-note-input"
                value={paidBtnShow}
                defaultValue={paidBtnShow}
                onChange={(e) => setPaidBtnShow(e.target.value)}
              >
                {member?.map((item, idx) => (
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
                  let len = getStrLength(e.target.value);
                  if (len <= 20) {
                    setNote(e.target.value);
                  } else {
                    alert("You have received maximun number of this field");
                  }
                }}
              ></textarea>
            </div>
            {type === "Expense" ? (
              <>
                <div style={{ marginTop: "25px" }}>
                  <div className="add-account-input">
                    <label className="add-label">Tag</label>
                    <div className="add-tag-container">
                      {expenseTags.map((item, index) => (
                        <div
                          key={index}
                          className={`add-tag ${
                            tag === item.tag && "chosenBtn"
                          }`}
                          onClick={(e) => setTag(e.target.textContent)}
                        >
                          {item.tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* <div style={{ marginTop: "10px", marginLeft: "8%" }}> */}
                {member?.length > 1 ? (
                  <div style={{ display: "flex", alignItem: "center" }}>
                    <label className="add-split-label">Split Account</label>
                    <label
                      className="switch"
                      onChange={() => setSplit(split ^ 1)}
                    >
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>

                    <div className={`split-detail ${split === 0 && "none"}`}>
                      {member?.map((item, idx) => (
                        <div key={idx}>
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
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="add-right">
            <div className="add-date">
              <label className="add-label">Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (
                    date === null ||
                    date.getFullYear() > 2030 ||
                    date.getFullYear() <= 2000
                  ) {
                    alert("Please select a valid date");
                  } else {
                    setStartDate(date);
                  }
                }}
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
