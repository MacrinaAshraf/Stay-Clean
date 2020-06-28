import axios from 'axios';
import React, { useState, useEffect } from "react";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
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
  Label,
  Row,
  Col
} from "reactstrap";


const CompanyRegister = (props) => {

  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionErr, setDescriptionErr] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [address, setAddress] = useState('')
  const [addressErr, setAddressErr] = useState('')
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [conPasswordErr, setConPasswordErr] = useState('');
  const [file, setFile] = useState('');
  const [fileErr, setFileErr] = useState('');
  const [errorCounter, setErrorCounter] = useState(0);


  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    var promise = new Promise((resolve, reject) => {
      setErrorCounter(0);
      setTimeout(() => resolve("done"), 1000);
    });
    promise.then((res) => {
      if (name.length < 2) {
        setErrorCounter(1)
        setNameErr("company name should containe more than 2 characters")
      }
      else {
        setNameErr("")
      }
    })
      .then((res) => {

        if (description.length < 15) {
          setErrorCounter(1)
          setDescriptionErr("company name should containe more than 15 characters")
        }
        else {
          setDescriptionErr("")
        }
      })
      .then((res) => {

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          setErrorCounter(1)
          setEmailErr("Inavalid Email")
        }
        else {

          axios.post('http://localhost:8000/user-api/user/user_email/', {
            email: email
          })
            .then(function (response) {
              if (response.data.found == "true") {
                return (true)

              } else {
                return (false)
              }
            })
            .then(function (value) {
              // console.log(value)

              if (value != true) {
                setEmailErr("")
              }
              else {
                setErrorCounter(1)
                setEmailErr("exist / select another one")
              }
            });
        }
      })
      .then((res) => {

        if (address.length < 15) {
          setErrorCounter(1)
          setAddressErr("company name should containe more than 15 characters")
        }
        else {
          setAddressErr("")
        }
      })
      .then((res) => {


        if (! /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+-]).{10}$/.test(password)) {
          setErrorCounter(1)
          setPasswordErr("password should contain 10 character (lowercase, upercase and special character)")
        }
        else {
          setPasswordErr("")
        }
      }).then((res) => {

        if (password != conPassword) {
          setErrorCounter(1)
          setConPasswordErr("not same as password")
        }
        else {
          setConPasswordErr("")
        }
      }).then((res) => {

        if (file) {
          setFileErr("")
        }
        else {
          setErrorCounter(1)
          setFileErr("PDF File is Mandatory")
        }
      }

      ).then((res) => {
        console.log(errorCounter)
        if (errorCounter == 1) {
          let form_data = new FormData();

          form_data.append('policy', file, file.name);

          axios.post('http://localhost:8000/user-api/user/', {
            name,
            email,
            description,
            address,
            password,
            is_company: true,
            is_active: false
          },
          ).then(response => {

            if (response.status.code === 400) {
              setErrorCounter(true);
            }
            else {
              // const { token } = response.data;
              // localStorage.setItem("token", token);
              axios.post('http://127.0.0.1:8000/user-api/company/add_policy/', form_data).then(res => {
                if (res.data) {
                  // console.log(res.data);
                  // sessionStorage.setItem('is_company', res.data['is_company'])
                  // sessionStorage.setItem('email', res.data['email'])
                  window.location.href = "http://localhost:3000/error";

                }
              }).catch(error => console.error(error));
            }
          })
        }














      })





  };


  const handleNameChange = (e) => {
    const { target: { value } } = e;
    setName(value);
  }
  const handleDescriptionChange = (e) => {
    const { target: { value } } = e;
    setDescription(value);
  }
  const handleEmailChange = (e) => {
    const { target: { value } } = e;
    setEmail(value);
  }
  const handleAddressChange = (e) => {
    const { target: { value } } = e;
    setAddress(value);
  }
  const handlePasswordChange = (e) => {
    const { target: { value } } = e;
    setPassword(value);
  }
  const handleConPasswordChange = (e) => {
    const { target: { value } } = e;
    setConPassword(value);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    // console.log(e.target.files[0]);
    // console.log("file", file);
  };
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
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Company Name"
                            maxLength="30"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                          />
                        </InputGroup>
                        {nameErr ?
                          (<div className="alert alert-danger p-3" role="alert"> {nameErr}</div>) :
                          (<></>)}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Description"
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                          />
                        </InputGroup>
                        {descriptionErr ?
                          (<div className="alert alert-danger p-3" role="alert"> {descriptionErr}</div>) :
                          (<></>)}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            maxLength="30"
                            onChange={handleEmailChange}
                          />
                        </InputGroup>
                        {emailErr ?
                          (<div className="alert alert-danger p-3" role="alert"> {emailErr}</div>) :
                          (<></>)}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-mobile-button" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Address"
                            type="text"
                            value={address}
                            onChange={handleAddressChange}
                          />
                        </InputGroup>
                        {addressErr ?
                          (<div className="alert alert-danger p-3" role="alert"> {addressErr}</div>) :
                          (<></>)}
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
                            autoComplete="off"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                        </InputGroup>
                        {passwordErr ?
                          (<div className="alert alert-danger p-3" role="alert"> {passwordErr}</div>) :
                          (<></>)}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Confirm Password"
                            type="password"
                            autoComplete="off"
                            value={conPassword}
                            onChange={handleConPasswordChange}
                          />
                        </InputGroup>
                        {conPasswordErr ?
                          (<div className="alert alert-danger p-3" role="alert"> {conPasswordErr}</div>) :
                          (<></>)}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <Label for="file">
                              <h5>Please upload a copy of your policy in pdf format</h5>
                            </Label>
                          </InputGroupAddon>
                          <Input
                            id="file"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            // value={password}
                            // onChange={handlePasswordChange}
                            required
                          />
                        </InputGroup>

                      </FormGroup>
                      {fileErr ?
                        (<div className="alert alert-danger p-3" role="alert"> {fileErr}</div>) :
                        (<></>)}
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


export default CompanyRegister;
