import React from "react";
import axios from 'axios';
import classnames from "classnames";
import Hero from "../IndexSections/Hero.js";
import TapsCMessages from "./TapsC-Messages";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Row,
} from "reactstrap";

class Messages extends React.Component {

  state = {
    all_users: [],
    selectedUser: -1,
    myMess: "",
  }

  all_users = () => {
    axios.get('http://localhost:8000/user-api/customer/company_customer/', {
      headers: {
        Authorization:
        "Token " + localStorage.getItem("token"),
      }

    })
      .then(res => {
        if (res.data) {
          this.setState({ all_users: res.data })
          if (res.data.length != 0) {
            this.setState({ selectedUser: res.data[0].id })
          }
        }
      })
      .catch(error => console.error(error))
  }

  handleChange = (e) => {
    this.setState({ selectedUser: e.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.selectedUser)
    console.log(this.state.myMess)

    if (this.state.myMess != "") {
      axios.post("http://127.0.0.1:8000/api/message/", {
        message: this.state.myMess,
        customer: this.state.selectedUser,
        sender: "C"
      }, {
        headers: {
          Authorization:
            "Token " + localStorage.getItem("token"),
        },
      }).then(() => {
        this.setState({ myMess: "" });
      });
    };

  }


  componentDidMount() {
    // if (sessionStorage.getItem("token")!="" && sessionStorage.getItem("is_company") == "true") 
    {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.main.scrollTop = 0;

      this.all_users();
      this.interval = setInterval(() => {
        this.all_users();
      }, 8000);
    }
    // else
    {
      // window.location.href = "/";
    }

  }



  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Hero />


          <section className="section section-components">
            <Container>
              <TapsCMessages />
            </Container>
          </section>



          <section className="section section-lg pt-lg-0 section-contact-us">
            <Container>
              <Row className="justify-content-center ">
                <Col lg="8">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">Want to send message to company ?</h4>

                      <Form onSubmit={this.handleSubmit}>
                        <FormGroup
                          className={classnames("mt-5", {
                            focused: this.state.nameFocused
                          })}
                        >

                          <select
                            onChange={this.handleChange}
                            className="ant-input selectBox"
                            style={{ width: 200 }}
                            value={this.state.selectedUser}
                            defaultValue={this.state.selectedUser}
                          >

                            {this.state.all_users.map((user) => (
                              (
                                <>
                                  <option value={user.id}>{user.first_name + " " + user.last_name + " " + user.phone}</option>
                                </>
                              )
                            ))}

                          </select>
                        </FormGroup>


                        <FormGroup className="mb-4">
                          <InputGroup className="input-group-alternative">
                            <Input
                              className="form-control-alternative"
                              cols="80"
                              name="name"
                              placeholder="Type a message..."
                              rows="4"
                              type="textarea"
                              value={this.state.myMess}
                              onChange={e => {
                                this.setState({ myMess: e.target.value })
                              }}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div>
                          <Button
                            block
                            className="btn-round"
                            color="default"
                            size="lg"

                          >
                            Send Message
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
}

export default Messages;
