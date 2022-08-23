import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import { Badge, Button, Row, Col, Card, Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import axios, { BASE_URL } from "../api/axios";
import { Link } from "react-router-dom";
import Issuecard from "./issuecard";
import { io } from "socket.io-client";
import Socket from "./socket";
export default function Counter(props) {
  const { auth } = useAuth();

  const [issues, setIssues] = useState([]);
  const [countname, setCountname] = useState("");
  const [countnum, setCountnum] = useState("");
  const [issueid, setIssueid] = useState("");
  const [nulla, setNulla] = useState(false);
  const [counter, setCounter] = useState(true);

  const { setAuth } = useAuth();
  const Token = auth?.accessToken;
  console.log(auth?.user);

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  const viewIssueHandler = async (id, queue_num, name) => {
    try {
      const res = await authAxios.put(`api/cuser/issuecalled/${id}`);
      console.log(res);
      const res1 = await authAxios.put(
        `api/cuser/nextissuecalled/${queue_num}`
      );
      Socket.emit("sendNotification", {
        receiverName: name,
        type: "You are called .Please come to the counter",
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await authAxios.post("/api/cuser/getcounterissues");
        if (!response.data.length == 0) {
          setIssues(response.data);
        } else {
          setNulla(true);
        }

        console.log(response.data);

        setCountname(auth?.user);
        setCountnum(auth?.counterInfo[0].id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIssues();
  }, []);

  const closecounter = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      localStorage.clear();
      setAuth();
    } catch (error) {
      console.log(error);
    }
  };

  const renderissuelist = issues.map((issue) => (
    <Issuecard issue={issue} key={issue.id} clickHander={viewIssueHandler} />
  ));

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
                <h6>{countname}</h6>
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
            <Badge pill bg="black-50">
              <h6>Counter:00{countnum}</h6>
            </Badge>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="issues">
              <>
                {nulla ? (
                  <section>
                    <h3>No issues to display</h3>
                  </section>
                ) : (
                  <section>{renderissuelist}</section>
                )}
              </>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
