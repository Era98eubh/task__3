import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import { Form, Badge, Button, Row, Col, Card, Container } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import axios, { BASE_URL } from "../api/axios";
import Queuedisplay from "./queuedisplay";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

export default function Issueinput() {
  const { auth, setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [name, setNAme] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [sendissue, SetSendissue] = useState(false);
  const [counter, setCounter] = useState("");
  const [queuenum, setQueuenum] = useState("");
  const navigate = useNavigate();

  const Token = auth?.accessToken;
  console.log(auth?.user);

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await authAxios.post("api/nuser/getissue");
        if (res.data === 0) {
          SetSendissue(false);
        } else {
          SetSendissue(true);
        }

        setUsername(auth?.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchuser();
  }, []);

  const logout = async () => {
    try {
      localStorage.clear();
      setAuth();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));

    setAuth(data);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(name, tel, issue, email);

      const res = await authAxios.post(
        "api/nuser/createissue",
        JSON.stringify({ name: name, tel: tel, email: email, issue: issue }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true
        }
      );

      setEmail("");
      setIssue("");
      setNAme("");
      setTel("");

      setCounter(res.data.counter);
      setQueuenum(res.data.queue_num);
      //navigate("/queuedisplay")
      SetSendissue(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
    
      <>
        {sendissue ? (
          <Queuedisplay counter={counter} queuenum={queuenum} />
        ) : (
          <section>
            <Row>
              <Col className="pl-32 pr-32">
                <Card.Body
                  id="profilename"
                  border="success"
                  style={{ width: "13rem" }}
                >
                  <h6>{username}</h6>
                  <Button
                    id="logoutbtn"
                    variant="outline-warning"
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </Card.Body>
                <Button id="submitbtn" variant="warning" type="submit">
                  <FaBell />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <form onSubmit={handleSubmit}>
                  <Form.Group role="form" className="" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      onChange={(e) => setNAme(e.target.value)}
                      value={name}
                      required
                    />

                    <Form.Group className="mx-auto" controlId="formTelephone">
                      <Form.Label>Telephone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Telephone"
                        onChange={(e) => setTel(e.target.value)}
                        value={tel}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mx-auto" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mx-auto" controlId="formIssue">
                      <Form.Label>Issue</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Issue"
                        onChange={(e) => setIssue(e.target.value)}
                        value={issue}
                        required
                      />
                    </Form.Group>
                    <Button id="submitbtn" variant="success" type="submit">
                      Submit
                    </Button>
                  </Form.Group>
                </form>
              </Col>
            </Row>
          </section>
        )}
      </>
  
    </Container>
  );
}
