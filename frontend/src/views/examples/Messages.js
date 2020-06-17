import React from "react";
import classnames from "classnames";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap";


// index page sections
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Hero from "../IndexSections/Hero.js";
import Blogs from "../IndexSections/Blogs.js";
import TapsMessages from "../IndexSections/Taps-Messages";
import axios from 'axios';
class Messages extends React.Component {

  state = {
    all_companies: [],
    most_review_program: {},
    most_selected_program: {},
  }

  all_companies = () => {
    axios.get('http://127.0.0.1:8000/all_companies/')
      .then(res => {
        // console.log("res.data.all_companies")
        // console.log(res.data)

        if (res.data.all_companies) {
          this.setState({ all_companies: res.data.all_companies })

        }
      })
      .catch(error => console.error(error))
  }

  most_review_program = () => {
    axios.get('http://127.0.0.1:8000/most_review_program/')
      .then(res => {
        // console.log("most_review_program")
        // console.log(res.data)
        if (res.data.most_review_program) {
          this.setState({ most_review_program: res.data.most_review_program })

        }

      })
      .catch(error => console.error(error))
  }

  most_selected_program = () => {
    axios.get('http://127.0.0.1:8000/most_selected_program/')
      .then(res => {
        console.log("res.data.most_selected_program")
        console.log(res.data)
        if (res.data.most_selected_program) {
          this.setState({ most_selected_program: res.data.most_selected_program })
        }


      })
      .catch(error => console.error(error))
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;


    this.all_companies();
    this.most_review_program();
    this.most_selected_program();

  }

  render() {

    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Hero />


          <section className="section section-components">
            <Container>
              <TapsMessages
                userId="1"
              />
            </Container>
          </section>



          <section className="section section-lg pt-lg-0 section-contact-us">
            <Container>
              <Row className="justify-content-center ">
                <Col lg="8">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">Want to send message to company ?</h4>



                      <FormGroup
                        className={classnames("mt-5", {
                          focused: this.state.nameFocused
                        })}
                      >

                        <UncontrolledDropdown>
                          <DropdownToggle caret >
                            
                            <h6 className="mb-0">Select Company</h6>

                           </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>


                      </FormGroup>


                      <FormGroup
                        className={classnames("mt-5", {
                          focused: this.state.nameFocused
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-user-run" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Your name"
                            type="text"
                            onFocus={e => this.setState({ nameFocused: true })}
                            onBlur={e => this.setState({ nameFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={classnames({
                          focused: this.state.emailFocused
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email address"
                            type="email"
                            onFocus={e => this.setState({ emailFocused: true })}
                            onBlur={e => this.setState({ emailFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative"
                          cols="80"
                          name="name"
                          placeholder="Type a message..."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                      <div>
                        <Button
                          block
                          className="btn-round"
                          color="default"
                          size="lg"
                          type="button"
                        >
                          Send Message
                        </Button>
                      </div>
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
