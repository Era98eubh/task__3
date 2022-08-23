import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import { Badge, Button, Row, Col, Card, Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useLocation, useParams } from "react-router-dom";
import axios, { BASE_URL } from "../api/axios";
import { Link } from "react-router-dom";

const Countercall = (props) => {
  console.log(useParams().id);
  const id = useParams().id;
  const [issue, setIssue] = useState({});
  const [countname, setCountname] = useState("");
  const [countnum, setCountnum] = useState("");
  const [nulla, setNulla] = useState(false);

  const { auth } = useAuth();
  const { setAuth } = useAuth();

  const Token = auth?.accessToken;
  console.log(auth?.user);

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await authAxios.get(`api/cuser/issue/${id}`);
        if (response.data == null) {
          setNulla(true);
        } else {
          setIssue(response.data);
          console.log(response.data);
        }
        console.log(response.data);

        setCountname(auth?.user);
        setCountnum(auth?.counterInfo[0].id);
        console.log(auth?.counterInfo[0].counter_num);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIssue();
  }, []);

  const issuedone = async (id) => {
    try {
      const res = await authAxios.put(`api/cuser/issuedone/${id}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const callnext = async (id) => {
    try {
      const res1 = await authAxios.put(`api/cuser/getnextissue/${id}`);

      if (res1.data == null) {
        setNulla(true);
      } else {
        setIssue(res1.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      setAuth();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          {/*  */}
          <Col style={{marginTop: "-150"}}>
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
          <Col>
            <Badge pill bg="black-50">
              <h6>Counter:00{countnum}</h6>
            </Badge>
          </Col>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <>
              {nulla ? (
                <section>
                  <h3>No issues to display</h3>
                </section>
              ) : (
                <section>
                  <div className="d-flex justify-content-between">
                      <div></div>
                      <div className="d-flex justify-content-center">
                      <Badge pill bg="success">
                          <h3>{issue.queue_num}</h3>
                        </Badge>
                        <h3 className="mt-2"> {issue.name}</h3>
                      </div>
                      <div></div>
                  </div>
                  <Card style={{ width: "63rem" }}>
                    <Card.Body>
                      <Card.Title>
                       
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Issue
                      </Card.Subtitle>
                      <Card.Text>{issue.issue}</Card.Text>
                    </Card.Body>
                  </Card>
                </section>
              )}
            </>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              id="Donebtn"
              variant="warning"
              onClick={() => callnext(issue.id)}
            >
              Done & Call Next
            </Button>

            <Link to="/counter">
              <Button
                id="Donebtn"
                variant="success"
                onClick={() => issuedone(issue.id)}
              >
                Done
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Countercall;
