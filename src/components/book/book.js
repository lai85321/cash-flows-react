import "./book.css";
import book from "../../images/book.png";
import { Link } from "react-router-dom";
function Book(props) {
    const {books}=props 
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
        {books.map((item,idx)=>{
            const image = book.image || book;
            return(<div key={idx} className="book-list">
                <div className="book-picture" style={{ backgroundImage: `url(${image})` }}></div>
                <div className="book-name">{item.name}</div>
                
            </div>)})}
      </div>
      </div>
     
    </div>
  );
}

export default Book;
