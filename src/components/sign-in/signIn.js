import "./signIn.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const { REACT_APP_HOST, REACT_APP_API_VERSION } = process.env;
const SignIn = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        console.log(json);
        navigate("/account", { replace: true });
      });
  };
  return (
    <div class="signin_page">
      <div id="signin-container">
        <div class="signin">
          <h3 className="signin-title">Login</h3>
          <div class="signin">
            <input
              type="text"
              id="username"
              value={email}
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <div class="tab"></div>
            <input
              type="text"
              id="password"
              value={password}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <div class="tab"></div>
            <button
              value="login"
              class="signin-submit"
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
  );
};

export default SignIn;
