import "./nav.css";
import { Link, useParams } from "react-router-dom";
function Nav() {
  let { bookId } = useParams();
  return (
    <div className="nav-container">
      <div className="nav">
        <div className="book-icon"></div>
        <div className="nav-lists">
          <Link to={`/account/${bookId}`}>
            <div className="nav-list">Account</div>
          </Link>
          <Link to={`/balance/${bookId}`}>
            <div className="nav-list">Balance</div>
          </Link>
          <Link to={`/dashboard/${bookId}`}>
            <div className="nav-list">Dashboard</div>
          </Link>
        </div>
      </div>
      <Link to={`/addAccount/${bookId}`}>
        <div className="btn">Record Payment</div>
      </Link>
    </div>
  );
}

export default Nav;
