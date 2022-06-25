import Menu from "../components/menu/menu";
import Book from "../components/book/book"
import { useEffect, useState } from "react";

const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;
function BookPage() {
  const userId = localStorage.getItem("id");
  const [books, setBooks] = useState([]);
  const fetchBookList = (userId) => {
    fetch(
      `${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/books?userId=${userId}}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setBooks(response.data);
      });
  };
  useEffect(() => {
    fetchBookList(userId);
  }, [userId]);
  return (
    <div>
      <Menu />
      <Book books={books}/>
    </div>
  );
}

export default BookPage;
