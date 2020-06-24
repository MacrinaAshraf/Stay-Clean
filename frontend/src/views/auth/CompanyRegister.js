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
  Label,
  Row,
  Col
} from "reactstrap";

import axios from 'axios';

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

const CompanyRegister = (props) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [file, setFile] = useState('');
  const [error, setError] = useState(false);


  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (conPassword === password) {

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
            setError(true);
          }
          else {
            // const { token } = response.data;
            // localStorage.setItem("token", token);
            axios.post('http://127.0.0.1:8000/user-api/company/add_policy/', form_data).then(res => {
              if (res.data) {
                console.log(res.data);
                // sessionStorage.setItem('is_company', res.data['is_company'])
                // sessionStorage.setItem('email', res.data['email'])
                window.location.href = "http://localhost:3000/error";
    
              }
            }).catch(error => console.error(error));
          }
        }, (error) => {
          console.log(error);
        });
    }
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
    console.log(e.target.files[0]);
    console.log("file", file);
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
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                          />
                        </InputGroup>
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
                            onChange={handleEmailChange}
                          />
                        </InputGroup>
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
