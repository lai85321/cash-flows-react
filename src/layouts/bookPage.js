import Menu from "../components/menu/menu";
import Book from "../components/book/book";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;
function BookPage() {
  let navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [books, setBooks] = useState([]);
  const [bookLoading, setBookLoading] = useState(true);

  useEffect(() => {
    const fetchBookList = (userId) => {
      setBookLoading(true);
      fetch(
        `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/books?userId=${userId}}`,
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
            // alert("Please log in");
            navigate(`/signIn`, { replace: true });
          }
          return response.json();
        })
        .then((response) => {
          setBooks(response.data);
          setBookLoading(false);
        });
    };

    fetchBookList(userId);
  }, [userId, navigate]);
  return (
    <div>
      <Menu />
      <Book
        books={books}
        userId={userId}
        setBooks={setBooks}
        bookLoading={bookLoading}
      />
    </div>
  );
}

export default BookPage;
