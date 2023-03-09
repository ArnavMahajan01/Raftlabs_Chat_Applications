import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import makeToast from "../Toaster";

const LoginPage = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  let navigate = useNavigate();

  const loginrUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:5001/signin", {
        email,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.msg);
        localStorage.setItem("CC_Token", response.data.accessToken);
        console.log(response.data);
        navigate("/dashboard");
        props.setupSocket();
      })
      .catch((err) => {
        makeToast("error", err.response.data.msg);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={loginrUser}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
