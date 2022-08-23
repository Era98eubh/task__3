import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Col,
  Container,
  Row,
  Badge,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Socket from "./socket";
export default function Queuedisplay(props) {
  console.log("counter props", props);
  const { setAuth, auth } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [counter, setCounter] = useState("");
  const [queue_num, setQueuenum] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(auth?.user);

    
    setCounter(props.counter);
    setQueuenum(props.queuenum);

    console.log(auth?.queue_num);
    console.log(auth?.counter);

    const id = props.counter || auth?.counter;
    console.log(id);

    if (id == 2) {
      Socket.on("getqueuenum1", (m) => {
        setNext(m.counter_next_num);
        setCurrent(m.counter_current_num);
      });
    }
    if (id == 3) {
      Socket.on("getqueuenum2", (m) => {
        // console.log(m.counter_current_num)
        //console.log(m.counter_next_num)
        setNext(m.counter_next_num);
        setCurrent(m.counter_current_num);
      });
    }
    if (id == 4) {
      Socket.on("getqueuenum3", (m) => {
        // console.log(m.counter_current_num)
        //console.log(m.counter_next_num)
        setNext(m.counter_next_num);
        setCurrent(m.counter_current_num);
      });
    }
  }, []);

  const logout = async () => {
    try {
      localStorage.clear();
      setAuth();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
          <Card.Body
              id="profilename"
              border="success"
              style={{ width: "13rem" }}
            >
              <Badge pill bg="success">
                <h6>{user}</h6>
              </Badge>
              <Button
                id="logoutbtn"
                variant="outline-warning"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </Card.Body>
          </Col>
          <Col>
            
            <Link to="/notifications">
              <Button id="submitbtn" variant="warning" type="submit">
                <FaBell />
              </Button>
            </Link>
          </Col>{" "}
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 1 }}>
            <Card
              id="id"
              md={{ span: 6, offset: 3 }}
              border="success"
              style={{ width: "75rem", height: "26rem" }}
            >
              <Card.Title>
                <div class=" d-flex align-items-center justify-content-center p-2">
                  <div className="border bg-dark border-primary border-2 p-3">
                    <h4 className="text-light">Counter 00{counter}</h4>
                  </div>
                </div>
              </Card.Title>
              <Card.Body>
                <div class="d-flex flex-row justify-content-between p-4">
                    <div class="d-flex p-2 flex-col border border-1 border-primary align-items-center justify-content-center" style={{display: "flex",flexDirection: "column"}}>
                      <h3 className="text-dark">Current Number</h3>
                      <div><p id="currentnum" className="text-dark">0{current}</p></div>
                    </div>
                    <div class="d-flex p-2 flex-col border border-1 border- align-items-center justify-content-center" style={{display: "flex",flexDirection: "column"}}>
                      <h1>Your Number</h1>
                      <p id="currentnum" className="text-success">0{queue_num}</p>
                    </div>
                    <div class="d-flex p-2 flex-col border border-1 border-primary align-items-center justify-content-center"style={{display: "flex",flexDirection: "column"}}>
                      <h3>Next Number</h3>
                      <p id="currentnum" className="text-primary">0{next}</p>
                    </div>
                </div>
             
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
