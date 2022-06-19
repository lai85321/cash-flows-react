import "./nav.css";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div className="nav-container">
      <div className="nav">
        <div className="book-icon"></div>
        <div className="nav-lists">
          <Link to="/">
            <div className="nav-list">Account</div>
          </Link>
          <div className="nav-list">Balance</div>
          <div className="nav-list">Dashboard</div>
        </div>
      </div>
      <Link to="/addAccount">
        <div className="btn">Add Account</div>
      </Link>
    </div>
  );
}

export default Nav;
