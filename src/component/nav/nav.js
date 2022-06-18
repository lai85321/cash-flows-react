import "./nav.css";

function Nav() {
  return (
    <div className="nav-container">
      <div className="nav">
        <div className="book-icon"></div>
        <div className="nav-lists">
          <div className="nav-list">Account</div>
          <div className="nav-list">Balance</div>
          <div className="nav-list">Dashboard</div>
        </div>
      </div>
      <div className="btn">Add Account</div>
    </div>
  );
}

export default Nav;
