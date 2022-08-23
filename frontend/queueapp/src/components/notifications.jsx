import React, { useEffect, useState } from "react";
import { Col, Container, Row, Badge, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { io } from "socket.io-client";
import Socket from "./socket";
import Notifycard from "./notifycard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notifications() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(auth?.user);
    Socket.on("getNotification", (data) => {
      console.log(data.type);
      toast.success(data.type);
      setNotifications([...notifications, data]);
      console.log(data);
      console.log(notifications);
      localStorage.setItem("notifications", JSON.stringify([data]));


      //console.log(nw)
      toast.success("🦄 Wow so easy!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }, [Socket]);

  const nw = JSON.parse(localStorage.getItem("notifications"));

  const rendernotifylist = notifications.map((notification) => (
    <Notifycard notification={notification} key={notification.id} />
  ));

  console.log(notifications);
  const logout = async () => {
    try {
      //localStorage.clear();
      setAuth();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(notifications);
  const displayNotification = ({ type, id }) => {
    return (
      <Card id="id" border="success" style={{ width: "45rem" }} key={id}>
        <Card.Title>
          <Badge pill bg="warning" >
            message:
          </Badge>
        </Card.Title>
        <Card.Body>
          <p id="issuename">{type}</p>
        </Card.Body>
      </Card>
    );
  };

  const notify = () => {
    toast("Wow so easy!");
  };
  return (
    <Container>
      <Row>
        <Col>
        <Card.Body
            id="profilename"
            border="success"
            style={{ width: "13rem"}}
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
          

          <Button
            id="submitbtn"
            variant="warning"
            type="submit"
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </Col>{" "}
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <>
            {!nw == null ? (
              <section>
                {nw.map((data, index) => {
                  return (
                    <Card
                      id="id"
                      border="success"
                      style={{ width: "45rem" }}
                      key={index}
                    >
                      <Card.Title>
                        <Badge pill bg="warning">
                          message
                        </Badge>
                      </Card.Title>
                      <Card.Body>
                        <h6 id="issuename">{data.type}</h6>
                      </Card.Body>
                    </Card>
                  );
                })}
              </section>
            ) : (
              <section>
                <div></div>
                {notifications.map((data, index) => {
                  return (
                    <Card
                      id="id"
                      border="success"
                      style={{ width: "45rem" }}
                      key={index}
                    >
                      <Card.Title>
                        <Badge pill bg="warning">
                          message
                        </Badge>
                      </Card.Title>
                      <Card.Body>
                        <h6 id="issuename">{data.type}</h6>
                      </Card.Body>
                    </Card>
                  );
                })}
              </section>
            )}
          </>
        </Col>
      </Row>
    </Container>
  );
}
