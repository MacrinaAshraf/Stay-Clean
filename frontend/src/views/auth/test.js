import React, { useState, useEffect } from "react";

// reactstrap components
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

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

const Test = (props) => {

  //   const [fName, setFName] = useState('');
  //   const [lName, setLName] = useState('');
  //   const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('')
 
  const [error, setError] = useState(false);

  //   const responseGoogle=(res)=>{
  //     console.log(res);
  //     console.log(res.profileObj);
  //     console.log("hello"+res.profileObj.givenName);



  //    { axios.post('http://localhost:8000/user-api/user/',
  //     {
  //       first_name: res.profileObj.givenName,
  //       last_name:  res.profileObj.familyName,
  //       email,


  //     }, /*{
  //     withCredentials: true,
  //   }*/).then(response => {
  //       console.log(response);
  //       if (response.status == 400) {
  //         console.log("Not registered 250");
  //       } else {
  //         console.log("good");
  //         window.location = "http://localhost:3000/list-programs-page";
  //       }

  //     });
  //     }

  //   }
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // if(conPassword===password)
    {

        // console.log( phone);
        axios({
            method: 'post',
            url: 'http://localhost:8000/user-api/update_data/' ,
            data: {
              "phone": phone,
              // "password": password
            }
          })
        .then(response => {
          // console.log(response);
          if (response.status == 400) {
            // console.log("Not registered 250");
          } else {
            // console.log("good");
            window.location = "http://localhost:3000";
          }

        });
    }
  };


  //   const handleFNameChange = (e) => {
  //     const { target: { value } } = e;
  //     setFName(value);
  //   }
  //   const handleLNameChange = (e) => {
  //     const { target: { value } } = e;
  //     setLName(value);
  //   }
  //   const handleEmailChange = (e) => {
  //     const { target: { value } } = e;
  //     setEmail(value);
  //   }
  const handlePhoneChange = (e) => {
    const { target: { value } } = e;
    setPhone(value);
  }
    // const handlePasswordChange = (e) => {
    //   const { target: { value } } = e;
    //   setPassword(value);
    // }
    // const handleConPasswordChange = (e) => {
    //   const { target: { value } } = e;
    //   setConPassword(value);
    // }
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
                      <h4>Sign up</h4>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form">



                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-mobile-button" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Phone Number"
                            type="text"
                            value={phone}
                            onChange={handlePhoneChange}
                          />
                        </InputGroup>
                      </FormGroup>
                      {/* <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                        
                          <Input
                            placeholder="Password"
                            type="pssword"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                         
                          <Input
                            placeholder="Confirm Password"
                            type="password"
                            value={conPassword}
                            onChange={handleConPasswordChange}
                          />
                        </InputGroup>
                      </FormGroup> */}

                      <div className="text-center">
                        <Button
                          className="mt-4"
                          color="primary"
                          type="button"
                          onClick={handleRegisterSubmit}
                        >
                          Create account
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


export default Test;
