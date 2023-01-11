import { useState } from "react";
import axios from "axios";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Store";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const sendRequest = async () => {
    if (isLogin) {
      const res = await axios
        .post("/api/user/login", {
          email: email,
          password: password,
        })
        .catch((err) => console.log(err));
      // const data = await res.data;
    } else {
      const res = await axios
        .post("/api/user/signup", {
          name: name,
          email: email,
          password: password,
        })
        .catch((err) => console.log(err));
      // const data = await res.data;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then(() => dispatch(actions.login()))
      .then(() => navigate("/"))
      .then((data) => console.log("data is:", data))
      .catch((err) => console.log(err));
  };
  console.log(name);
  console.log(email);
  console.log(password);
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button onClick={handleSubmit}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
