import "./book.css";
import { Link } from "react-router-dom";
function Book() {
    const arr=[1,2,3]
  return (
    <div >
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
        {arr.map((item,idx)=>{
            return(<div key={idx} className="book-list">
                <div className="book-picture"></div>
                <div className="book-name">book 1</div>
            </div>)})}
      </div>
      </div>
     
    </div>
  );
}

export default Book;
