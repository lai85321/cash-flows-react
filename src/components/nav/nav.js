import "./nav.css";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div className="nav-container">
      <div className="nav">
        <div className="book-icon"></div>
        <div className="nav-lists">
          <Link to="/account">
            <div className="nav-list">Account</div>
          </Link>
          <Link to="/balance">
            <div className="nav-list">Balance</div>
          </Link>
          <Link to="/dashboard">
            <div className="nav-list">Dashboard</div>
          </Link>
        </div>
      </div>
      <Link to="/addAccount">
        <div className="btn">Add Account</div>
      </Link>
    </div>
  );
}

export default Nav;
