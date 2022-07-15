import "./editAccount.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
const EditAccount = () => {
  const location = useLocation();
  let { bookId } = location.state;
  let navigate = useNavigate();
  const REACT_APP_HOST = process.env.REACT_APP_HOST;
  const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;
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
  const [paid, setPaid] = useState(paidAmount);
  const updateAccount = () => {
    const typeId = typeBtns.findIndex((item) => item === type);
    const tagId = tags.findIndex((item) => item === tag);
    const paidIdx = userOptions.findIndex((item) => item.name === paidBtnShow);
    const body = {
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
      .then((response) => {
        if (response.status === 401) {
          // alert("Please log in");
          navigate(`/signIn`, { replace: true });
        }
        return response.json();
      })
      .then((json) => {
        navigate(`/book/${bookId}`, { replace: true });
      });
  };
  const checkBtns = [
    {
      text: "Cancel",
      class: "edit-check-cancel",
      onClick: () => {},
    },
    {
      text: "Update",
      class: "edit-check-save",
      onClick: updateAccount,
    },
  ];
  return (
    <div className="edit-container">
      <div className="edit-page">
        <div className="edit-header">
          <div className="edit-header-icon"></div>
          <div className="edit-header-text">Edit Account</div>
        </div>
        <hr></hr>
        <div className="edit-account-type">
          {typeBtns.map((item, index) => (
            <div
              key={index}
              className={`edit-account-type-button ${
                type === item && "chosenBtn"
              }`}
              onClick={(e) => setType(e.target.textContent)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="edit-body">
          <div className="edit-left">
            <div className="edit-account-input">
              <label className="edit-amount-label">Amount</label>
              <input
                className="edit-amount-input"
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
            <div className="edit-account-input">
              <label className="edit-label">Paid by</label>
              <select
                className="edit-note-input"
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
            <div className="edit-account-input">
              <label className="edit-label">Note</label>
              <textarea
                className="edit-note-input"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              ></textarea>
            </div>
            <div style={{ marginTop: "25px" }}>
              <div className="edit-account-input">
                <label className="edit-label">Tag</label>
                <div className="edit-tag-container">
                  {tags.map((item, index) => (
                    <div
                      key={index}
                      className={`edit-tag ${tag === item && "chosenBtn"}`}
                      onClick={(e) => setTag(e.target.textContent)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{ display: "flex", alignItem: "center", height: "35%" }}
            >
              <label className="edit-split-label">Split Account</label>
              <label className="switch" onChange={() => setSplit(split ^ 1)}>
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>

              <div className={`edit-split-detail ${split === 0 && "none"}`}>
                {userOptions.map((item, idx) => (
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
            </div>
          </div>
          <div className="edit-right">
            <div className="edit-date">
              <label className="edit-label">Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
        </div>
        <div className="edit-btns">
          <div className="edit-btns-left">
            <div className="edit-check-remove">
              <Link to={`/book/${bookId}`}>Remove</Link>
            </div>
          </div>
          <div className="edit-btns-right">
            <div className="edit-check">
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

export default EditAccount;
