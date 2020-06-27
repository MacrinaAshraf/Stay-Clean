import React from "react";
import axios from 'axios';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

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
  Row,
  Col
} from "reactstrap";



class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fName: "",
      fNameErr: "",
      lName: "",
      lNameErr: "",
      email: "",
      emailErr: "",
      friendEmail: "",
      friendEmailError: "",
      phone: "",
      phoneErr: "",
      password: "",
      passwordErr: "",
      conPassword: "",
      conPasswordErr: "",
      errCounter: 0,
      discount: "0",

    }
  }


  handleRegisterSubmit = (e) => {
    e.preventDefault();
    var self = this;
    // console.log(self.state.discount)

    var promise = new Promise((resolve, reject) => {


      this.setState({
        errCounter: 0,
        discount: "0",
      }, () => {

        if (this.state.friendEmail != "") {

          axios.post('http://localhost:8000/user-api/user/user_email/', {
            email: this.state.friendEmail
          })
            .then((response) => {
              if (response.data.found == "true") {
                return (true)

              } else {
                return (false)
              }
            })
            .then((value) => {
              console.log(value)

              if (value == true) {
                self.setState({ discount: "50%" })
                self.setState({ friendEmailError: "" })
              }
              else {
                self.setState({ errCounter: 1 })
                self.setState({ friendEmailError: "not valid email / let it empty if not exist" })
              }
            });
        }
        else {
          this.setState({ friendEmailError: "" })
        }
      })
      setTimeout(() => resolve("done"), 1000);
    });



    promise
      .then(() => {
        if (this.state.fName.length < 3) {
          this.setState({ errCounter: 1 })
          this.setState({ fNameErr: "first name length should be > 3 " })
        }
        else {
          this.setState({ fNameErr: "" })
        }
      })
      .then(() => {
        if (this.state.lName.length < 3) {
          this.setState({ errCounter: 1 })
          this.setState({ lNameErr: "last name length should be > 3 " })
        }
        else {
          this.setState({ lNameErr: "" })
        }
      })
      .then(() => {
        /*
     mysite@ourearth.com
     my.ownsite@ourearth.org
     mysite@you.me.net
     */
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
          this.setState({ errCounter: 1 })
          this.setState({ emailErr: "Inavalid Mail" })
        }
        else {


          var self = this;

          axios.post('http://localhost:8000/user-api/user/user_email/', {
            email: this.state.email
          })
            .then(function (response) {
              if (response.data.found == "true") {
                return (true)

              } else {
                return (false)
              }
            })
            .then(function (value) {
              console.log(value)

              if (value != true) {
                self.setState({ emailErr: "" })
              }
              else {
                self.setState({ errCounter: 1 })
                self.setState({ emailErr: "exist / select another one" })
              }
            });

        }
      })
      .then(() => {
        if (! /^01[0-3]\d{8}$/.test(this.state.phone)) {
          this.setState({ errCounter: 1 })
          this.setState({ phoneErr: "mobile format invalid" })

        }
        else {
          this.setState({ phoneErr: "" })
        }
      })
      .then(() => {
        if (! /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+-]).{10}$/.test(this.state.password)) {
          this.setState({ errCounter: 1 })
          this.setState({ passwordErr: "password should contain 10 character (lowercase, upercase and special character)" })
        }
        else {
          this.setState({ passwordErr: "" })
        }


      })
      .then(() => {
        if (this.state.password != this.state.conPassword) {
          this.setState({ errCounter: 1 })
          this.setState({ conPasswordErr: "not same as password " })
        }
        else {
          this.setState({ conPasswordErr: "" })
        }

      })

      .then(() => {
        console.log("hnaaaaaaaaaaa");
        console.log(this.state.errCounter);
        var self = this;
        if (this.state.errCounter != 1) {
          console.log("hnaaaaaaaaaaa3");

          axios.post('http://localhost:8000/user-api/user/', {
            first_name: self.state.fName,
            last_name: self.state.lName,
            email: self.state.email,
            phone: self.state.phone,
            password: self.state.password,
            discount: self.state.discount,
          })
            .then(function (response) {
              if (response.status == 400) {
                console.log(response.error)
              } else {
                console.log("good");
                window.location = "http://localhost:3000/login";
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }
      }).
      catch((error) => {
        console.log(error);
      });


  }


  handleFNameChange = (e) => {
    const { target: { value } } = e;
    this.setState({ fName: value });
  }
  handleLNameChange = (e) => {
    const { target: { value } } = e;
    this.setState({ lName: value });
  }
  handleEmailChange = (e) => {
    const { target: { value } } = e;
    this.setState({ email: value });
  }
  handleFriendEmailChange = (e) => {
    const { target: { value } } = e;
    this.setState({ friendEmail: value });
  }
  handlePhoneChange = (e) => {
    const { target: { value } } = e;
    this.setState({ phone: value });
  }
  handlePasswordChange = (e) => {
    const { target: { value } } = e;
    this.setState({ password: value });
  }
  handleConPasswordChange = (e) => {
    const { target: { value } } = e;
    this.setState({ conPassword: value });
  }



  responseFacebook = (res) => {
    console.log(res);
    const token = res.id;
    localStorage.setItem("token", token);
    const name = res.name;
    sessionStorage.setItem('name', name)
    
    console.log(token)
    axios.post('http://localhost:8000/user-api/user/user_email/', {
      email: res.email,
     
    })
      .then(function (response) {
        if (response.data.found == "true") {
          sessionStorage.setItem('is_company', 'false')
          window.location.href="http://localhost:3000/"

        } else {
      axios.post('http://localhost:8000/user-api/user/', {
        first_name: res.name,
        last_name: '',
        email: res.email,
        password: '12345',
        discount: 0,
        token: token,
      })
        .then(function (response) {
          if (response.status == 400) {
            console.log(response.error)
          } else {
            console.log("good");
            window.location = "http://localhost:3000/test";
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }


  })
  }

  responseGoogle = (res) => {

    const token = res.profileObj.googleId;
    localStorage.setItem("token", token);
    const name = res.profileObj.givenName;
    sessionStorage.setItem('name', name)
    axios.post('http://localhost:8000/user-api/user/user_email/', {
      email:res.profileObj.email
    })
      .then(function (response) {
        if (response.data.found == "true") {
          sessionStorage.setItem('is_company', 'false')
          window.location = "http://localhost:3000/";

        } else {
          axios.post('http://localhost:8000/user-api/user/', {
            first_name: res.profileObj.givenName,
            last_name: res.profileObj.familyName,
            email: res.profileObj.email,
            password: '12345',
            discount: 0,
            token: token,
          })
            .then(function (response) {
             
              if (response.status == 400) {
                console.log(response.error)
              } else {
                console.log("good");
                
                window.location = "http://localhost:3000/test";
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }
      })





  }
  render() {
    const inStyle = { width: '300px' };

    return (
      <>

        <DemoNavbar />
        <main>
          <section className="section section-shaped section-lg ">
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
            <Container className="lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white">
                      <div className="m--2 text-center">
                        <h4>Sign up</h4>
                      </div>
                    </CardHeader>
                    <CardBody className="lg-5 lg-5">
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="First Name"
                              type="text"
                              maxLength="30"
                              value={this.state.fName}
                              onChange={this.handleFNameChange}
                            />
                          </InputGroup>
                          {this.state.fNameErr ?
                            (<div className="alert alert-danger p-3" role="alert"> {this.state.fNameErr}</div>) :
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
                              placeholder="Last Name"
                              type="text"
                              maxLength="30"
                              value={this.state.lName}
                              onChange={this.handleLNameChange}
                            />
                          </InputGroup>
                          {this.state.lNameErr ?
                            (<div className="alert alert-danger p-3" role="alert"> {this.state.lNameErr}</div>) :
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
                              maxLength="20"
                              value={this.state.email}
                              onChange={this.handleEmailChange}
                            />
                          </InputGroup>
                          {this.state.emailErr ?
                            (<div className="alert alert-danger p-3" role="alert"> {this.state.emailErr}</div>) :
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
                              placeholder="Phone Number"
                              type="text"
                              maxLength="11"
                              value={this.state.phone}
                              onChange={this.handlePhoneChange}
                            />
                          </InputGroup>
                          {this.state.phoneErr ?
                            (<div className="alert alert-danger p-3" role="alert"> {this.state.phoneErr}</div>) :
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
                              value={this.state.password}
                              onChange={this.handlePasswordChange}
                            />
                          </InputGroup>
                          {this.state.passwordErr ?
                            (<div className="alert alert-danger p-3" role="alert"> {this.state.passwordErr}</div>) :
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
                              value={this.state.conPassword}
                              onChange={this.handleConPasswordChange}
                            />
                          </InputGroup>
                          {this.state.conPasswordErr ?
                            (<div className="alert alert-danger p-3" role="alert"> {this.state.conPasswordErr}</div>) :
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
                              placeholder="Friend Email To Get 50% discount"
                              type="email"
                              maxLength="20"
                              value={this.state.friendEmail}
                              onChange={this.handleFriendEmailChange}
                            />
                          </InputGroup>
                          {this.state.friendEmailError ?
                            (<div className="alert alert-danger p-3" role="alert"> {this.state.friendEmailError}</div>) :
                            (<></>)}
                        </FormGroup>


                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            onClick={this.handleRegisterSubmit}
                          >
                            Create account
                          </Button>

                          <br></br>
                          <br></br>

                          <GoogleLogin

                            clientId="777963071043-r303g49u2e8ksnjmg2764c4760na901a.apps.googleusercontent.com"
                            buttonText=" GOOGLE"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}




                          />

                          <FacebookLogin
                           cssClass="my-facebook-button-class  ml-2 p-2 mt-4  btn-primary"
                            appId="1217932635211907"
                            autoload={false}
                            icon="fa-facebook"
                            fields="name,email"
                            textButton="  FACEBOOK"
                            callback={this.responseFacebook}

                          />


                        </div>

                      </Form>


                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    )
  }
}


export default Register;
