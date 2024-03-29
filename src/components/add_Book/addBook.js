import "./addBook.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getStrLength from "../../method/getStrLength";
const AddBook = () => {
  let navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const REACT_APP_HOST = process.env.REACT_APP_HOST;
  const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;
  const [name, setName] = useState("");
  const [currencyId, setcurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState([]);

  const fetchCurrencyList = () => {
    fetch(`${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/currency`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          alert("Please log in");
          navigate(`/signIn`, { replace: true });
        }
        return response.json();
      })
      .then((response) => {
        setCurrencyData(response.data);
      });
  };
  useEffect(() => {
    fetchCurrencyList();
  });
  const submitBook = () => {
    if (name === "") {
      alert("Please type a book name");
      return;
    }
    const body = {
      userId: userId,
      currencyId: currencyId + 1,
      name: name,
    };
    fetch(`${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 401) {
          alert("Please log in");
          navigate(`/signIn`, { replace: true });
        }
        return response.json();
      })
      .then((json) => {
        if (!json.error) {
          navigate(`/book/${json.data.bookId}`, { replace: true });
        } else {
          alert(json.error);
        }
      });
  };
  const checkBtns = [
    {
      text: "Cancel",
      class: "add-book-check-cancel",
      onClick: () => {},
    },
    {
      text: "Save",
      class: "add-book-check-save",
      onClick: submitBook,
    },
  ];
  return (
    <div className="add-book-container">
      <div className="add-book-page">
        <div className="add-book-header">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "80%",
              alignItems: "center",
            }}
          >
            <div className="add-book-header-icon"></div>
            <div className="add-book-header-text">Add New Account</div>
          </div>
          {/* <label for="picture" className="add-book-upload-icon"></label>
          <input
            type="file"
            id="picture"
            style={{ display: "none", visibility: "none" }}
          ></input> */}
        </div>
        <hr></hr>
        <div className="add-account-type"></div>
        <div className="add-book-body">
          <div className="add-book-left">
            <div className="add-book-input">
              <label className="add-book-label">Name</label>
              <input
                placeholder="Enter a book name"
                className="add-name-input"
                value={name}
                onChange={(e) => {
                  let len = getStrLength(e.target.value);
                  if (len <= 16) {
                    setName(e.target.value);
                  } else {
                    alert("You have received maximun number of this field");
                  }
                }}
              />
            </div>
            <div className="add-book-input">
              <label className="add-book-currency-label">Currency</label>
              <select className="add-currency-input">
                {/* <option>請選擇幣別</option> */}
                {currencyData.map((item, idx) => (
                  <option
                    key={idx}
                    onChange={(e) => {
                      setcurrencyId(idx);
                    }}
                  >
                    {item.currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="add-book-right">
            <div className="add-book-margin"></div>
            <div className="add-book-check">
              {checkBtns.map((item, index) => (
                <div key={index} className={item.class} onClick={item.onClick}>
                  {item.text === "Cancel" ? (
                    <Link to="/book">{item.text}</Link>
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

export default AddBook;
