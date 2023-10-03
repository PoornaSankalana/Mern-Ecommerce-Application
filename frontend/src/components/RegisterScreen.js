import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { register } from "../actions/userActions";
import { Button, Input } from "@chakra-ui/react";
import avatarRegister from "./img/avatarRegister.svg";
import addUs from "./img/new.svg";
import wave from "./img/wavev.png";

const RegisterScreen = ({ location, history }) => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [message, setMessage] = useState(null);

const dispatch = useDispatch();

const userRegister = useSelector((state) => state.userRegister);
const { error, userInfo } = userRegister;

const redirect = location.search ? location.search.split("=")[1] : "/";

useEffect(() => {
  if (userInfo) {
    history.push(redirect);
  }
}, [history, userInfo, redirect]);

const submitHandler = (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    setMessage("Password do not match");
  } else {
    dispatch(register(name, email, password));
  }
};

return (
<div className="registerSc">
<Helmet>
<title>Register</title>
</Helmet>
     {/* Added alt attribute for accessibility */}
<img className="wave" src={wave} alt="Wave" />

<div className="containera">
<div className="imga">
         {/* Added alt attribute for accessibility */}
<img src={addUs} alt="Add User" />
</div>
<div className="login-content">
<form onSubmit={submitHandler}>
<img src={avatarRegister} alt="Avatar" />
          {error && <h4>{error}</h4>}
<div className="input-div zz">
<div className="i">
<i className="fas fa-user"></i>
</div>
<div className="div">
<input
                type="text"
                value={name}
                className="inputa"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
</div>
</div>
<div className="input-div one">
<div className="i">
<i className="fas fa-envelope"></i>
</div>
<div className="div">
<input
                type="text"
                value={email}
                className="inputa"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
</div>
</div>
<div className="input-div pass">
<div className="i">
<i className="fas fa-lock"></i>
</div>
<div className="div">
<input
                type="password"
                value={password}
                className="inputa"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
</div>
</div>
<div className="input-div passconf">
<div className="i">
<i className="fas fa-lock"></i>
</div>
<div className="div">
<input
                type="password"
                value={confirmPassword}
                className="inputa"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
</div>
</div>
          {message && <h4>{message}</h4>}
<input type="submit" className="btna2" value="Sign up" />
<br />
          Have an Account?{" "}
<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
</Link>
</form>
</div>
</div>
</div>
  );
};

export default RegisterScreen;