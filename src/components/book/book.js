import "./book.css";
import book from "../../images/book.png";
import { Link } from "react-router-dom";
import { DeleteBookModal } from "../modal/modal";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;
function Book(props) {
  let navigate = useNavigate();
  const { books, userId, setBooks, bookLoading } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [notice, setNotice] = useState(0);
  const [message, setMessage] = useState([]);
  const updateNoticeStatus = (userId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/message?userId=${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          alert("Please log in");
          navigate(`/signIn`, { replace: true });
        }
        return response.json();
      })
      .then((response) => {});
  };
  useEffect(() => {
    const fetchNoticeMsg = (userId) => {
      setIsLoading(true);
      fetch(
        `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/message?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 401) {
            alert("Please log in");
            navigate(`/signIn`, { replace: true });
          }
          return response.json();
        })
        .then((response) => {
          setNotice(response.data.notice);
          setMessage(response.data.detail);
          setIsLoading(false);
        });
    };

    fetchNoticeMsg(userId);
  }, [userId, navigate]);
  return (
    <div>
      <div className="book-nav-container">
        <div className="book-nav">
          <div className="book-page-logo"></div>
          <div className="book-nav-right">
            <Link to="/addBook">
              <div className="add-book-btn">Add Book</div>
            </Link>
            <div
              className="book-notice"
              onClick={() => {
                setShowMessage(!showMessage);
                if (notice === 0) {
                  updateNoticeStatus(userId);
                  setNotice(1);
                }
              }}
            >
              {!isLoading && (
                <span
                  className="badge"
                  style={{ display: `${notice === 0 ? "block" : "none"}` }}
                ></span>
              )}
            </div>
            <div
              className="book-notice-message"
              style={{
                display: `${showMessage === true ? "block" : "none"}`,
              }}
            >
              <div className="book-notice-message-title">Notifications</div>
              {message.length === 0 ? (
                <div style={{ padding: "2px 10px" }}>
                  There is no notifications
                </div>
              ) : (
                message.map((item, idx) => {
                  if (item.amount > 0) {
                    return (
                      <div className="book-notice-message-section" key={idx}>
                        <div className="book-notice-message-settleMsg">
                          {item.settle_name} settle up a payment in {item.book}
                        </div>
                        <div
                          className="book-notice-message-paidMsg"
                          style={{ color: "green" }}
                        >
                          {item.paid_name} paid you {item.amount}
                        </div>
                        <div className="book-notice-message-time">
                          {item.timestamp}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="book-notice-message-section" key={idx}>
                        <div className="book-notice-message-settleMsg">
                          {item.settle_name} settle up a payment in {item.book}
                        </div>
                        <div
                          className="book-notice-message-paidMsg"
                          style={{ color: "red" }}
                        >
                          {item.paid_name} received {-1 * parseInt(item.amount)}{" "}
                          from you
                        </div>
                        <div className="book-notice-message-time">
                          {item.timestamp}
                        </div>
                      </div>
                    );
                  }
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="book-container">
        <div className="book-lists">
          {!bookLoading && books.length === 0 ? (
            <div style={{ width: "100%" }}>
              <h3 style={{ textAlign: "center" }}>Let's add a new book</h3>
            </div>
          ) : (
            books.map((item, idx) => {
              const image = book.image || book;
              return (
                <div key={idx} className="book-list">
                  <Link
                    // onClick={() => {
                    //   setBookId(item.id);
                    //   updateOpenTIme(bookId, userId);
                    // }}
                    to={`/book/${item.id}`}
                  >
                    <div
                      className="book-picture"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </Link>
                  <div className="book-content">
                    <div className="book-space"></div>
                    <div className="book-name">{item.name}</div>
                    <div className="book-more-container">
                      <DeleteBookModal
                        bookId={item.id}
                        userId={userId}
                        setBooks={setBooks}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Book;
