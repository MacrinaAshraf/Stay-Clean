import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import axios from 'axios';

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

const Login = (props) => {

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  const handleEmailChange = (e) => {
    const { target: { value } } = e;
    setEmailInput(value);
  }

  const handlePasswordChange = (e) => {
    const { target: { value } } = e;
    setPasswordInput(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api-token-auth/',
      {
        username: emailInput,
        password: passwordInput
      }
    ).then((response) => {
      if (response.status.code ===  400) {
        setError(true);
      }
      else {
        console.log("hello");
        const { token } = response.data;
        localStorage.setItem("token", token);
        window.location.href = "http://localhost:3000/";
      }
    }, (error) => {
      console.log(error);
    });

    setEmailInput('');
    setPasswordInput('');
  }

  return (
    <>
      <DemoNavbar />
      <main>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white">
                    <div className="text-muted text-center">
                      <h4>Sign in</h4>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    {error ? <div className="text-center text-alert mb-4">
                      <small>Or sign in with credentials</small>
                    </div> : <div></div>}
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            name="username"
                            onChange={handleEmailChange}
                            value={emailInput}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            autoComplete="off"
                            onChange={handlePasswordChange}
                            value={passwordInput}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Sign in
                          </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}
//}

export default Login;
