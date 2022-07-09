import "./book.css";
import book from "../../images/book.png";
import { Link } from "react-router-dom";
import { DeleteBookModal } from "../modal/modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;
function Book(props) {
  let navigate = useNavigate();
  const { books, userId, setBooks } = props;
  const [showMessage, setShowMessage] = useState(false);
  const updateOpenTIme = (bookId, userId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/members/openTime?userId=${userId}&bookId=${bookId}`,
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
      .then((response) => {});
  };
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
              }}
            >
              <span
                className="badge"
                // style={{ display: `${notice ? "block" : "none"}` }}
              ></span>
            </div>
            <div
              className="book-notice-message"
              style={{
                display: `${showMessage === true ? "block" : "none"}`,
              }}
            >
              <div className="book-notice-message-title">Notifications</div>
            </div>
          </div>
        </div>
      </div>
      <div className="book-container">
        <div className="book-lists">
          {books.map((item, idx) => {
            const image = book.image || book;
            return (
              <div key={idx} className="book-list">
                <Link
                  onClick={updateOpenTIme(item.id, userId)}
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
          })}
        </div>
      </div>
    </div>
  );
}

export default Book;
