import "./home.css";
import { Link } from "react-router-dom";
import landing1 from "../../images/landing1.png";
import landing2 from "../../images/landing2.png";
function Home() {
  return (
    <>
      <div className="home-nav-container">
        <div className="home-nav">
          <div>
            <div className="home-logo"></div>
          </div>
          <div className="home-signin-signup-btns">
            <Link to="/signIn">
              <button className="home-signin-btn">Sign in</button>
            </Link>
            <div style={{ marginRight: "30px" }}></div>
            <Link to="/signUp">
              <button className="home-signup-btn">Sign up</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="home-body">
        <div className="home-main-container">
          <div className="home-main">
            <div className="home-main-left">
              <div className="home-main-slogan">Track every cash flows</div>
              <div className="home-main-content">
                Record and split payment at the same time
              </div>

              <div className="home-main-start-btn">
                <Link to="/signUp">Try it Now </Link>
              </div>
            </div>
            <div className="home-main-right">
              <div className="home-main-image"></div>
            </div>
          </div>
        </div>
        <div className="home-section-container">
          <div className="home-section">
            <div className="home-section-texts">
              <div className="home-section-header">Easy to record payment</div>
              <div className="home-section-content">
                Record and split payment at the same time
              </div>
            </div>
            <div
              className="home-section-images"
              style={{ backgroundImage: `url(${landing1})` }}
            ></div>
          </div>
        </div>
        <div className="home-section-container">
          <div className="home-section">
            <div className="home-section-texts">
              <div className="home-section-header">
                One click to get balanced
              </div>
              <div className="home-section-content">
                Calculate the easiest way to settle up for you
              </div>
            </div>
            <div
              className="home-section-images"
              style={{ backgroundImage: `url(${landing2})` }}
            ></div>
          </div>
        </div>
        <div style={{ backgroundColor: "white", height: "60px" }}></div>
      </div>
      <div className="home-footer-container"></div>
    </>
  );
}

export default Home;
