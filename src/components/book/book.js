import "./book.css";
import book from "../../images/book.png";
import { Link } from "react-router-dom";
import { DeleteBookModal } from "../modal/modal";
function Book(props) {
  const { books, userId, setBooks } = props;
  return (
    <div>
      <div className="book-nav-container">
        <div className="book-nav">
          <div className="book-page-logo"></div>
          <Link to="/addBook">
            <div className="add-book-btn">Add Book</div>
          </Link>
        </div>
      </div>
      <div className="book-container">
        <div className="book-lists">
          {books.map((item, idx) => {
            const image = book.image || book;
            return (
              <div key={idx} className="book-list">
                <Link to={`/book/${item.id}`}>
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
