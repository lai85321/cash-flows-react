import "./signIn.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;
const SignIn = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("andy@test.com");
  const [password, setPassword] = useState("test");
  const [errorMsg, setErrorMsg] = useState("");
  const submitSignIn = () => {
    const body = {
      provider: "native",
      email: email,
      password: password,
    };
    fetch(`${REACT_APP_HOST}/api/${REACT_APP_API_VERSION}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.error) {
          localStorage.setItem("id", json.data.user.id);
          localStorage.setItem("username", json.data.user.name);
          localStorage.setItem("picture", json.data.user.picture);
          localStorage.setItem("access_token", json.data.access_token);
          navigate("/book", { replace: true });
        } else {
          setErrorMsg("Please try again");
        }
      });
  };
  return (
    <div>
      <div className="signin-nav-container">
        <div className="signin-nav">
          <div>
            <Link to="/">
              <div className="home-logo"></div>
            </Link>
          </div>
        </div>
      </div>
      <div className="signin_page">
        <div id="signin-container">
          <div className="signin">
            <h3 className="signin-title">Login</h3>
            <div className="signin">
              <input
                className="signin-input"
                type="text"
                id="username"
                value={email}
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <div className="tab"></div>
              <input
                className="signin-input"
                type="password"
                id="password"
                value={password}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <div className="tab"></div>
              <div className="signin-error-msg">{errorMsg}</div>
              <button
                value="login"
                className="signin-submit"
                onClick={() => submitSignIn()}
              >
                Sign in
              </button>
            </div>
            <Link to="/signUp">
              <h5 className="switch-to-signup">Sign Up</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
