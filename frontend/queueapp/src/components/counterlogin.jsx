import React, { useRef, Section, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import { Form, Button, Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Counter from "./counter";
const LOGIN_URL = "/api/cuser/login";

export default function CounterLogin() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = "/counter";
  const userRef = useRef("");
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setsuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const counterInfo = response?.data?.counterinfo;
      localStorage.setItem(
        "user",
        JSON.stringify({ user, accessToken, counterInfo })
      );
      console.log(JSON.stringify({ user, accessToken, counterInfo }));
      setAuth({ user, accessToken, counterInfo });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <div Id="main" className=" col-md-6 offset-md-3 ">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="col-md- offset-md-4 justify content">Counter Login</h1>
        <form onSubmit={handleSubmit}>
          <Form.Group
            role="form"
            className="col-md-6 offset-md-2 my-3 "
            id="formBasicEmail"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              id="username"
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
          </Form.Group>
          <Form.Group
            className="col-md-6 offset-md-2 my-3 "
            id="formBasicPassword"
          >
            <label htmlFor="password">Password:</label>
            <Form.Control
              className="form-control"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <Button
              className="col-md-6 offset-md-3 mt-3"
              variant="success"
              type="submit"
            >
              Login
            </Button>
          </Form.Group>
        </form>
      </div>
    </section>
  );
}
