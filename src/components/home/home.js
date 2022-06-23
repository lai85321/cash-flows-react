import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-nav-container">
      <div className="home-nav">
        <div>
          <div className="home-logo"></div>
        </div>
        <div className="home-signin-signup-btns">
          <Link to="/signIn">
            <button className="home-signin-btn">Sign in</button>
          </Link>
          <Link to="/signUp">
            <button className="home-signup-btn">Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
