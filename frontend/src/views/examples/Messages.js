import React from "react";
import axios from 'axios';
import classnames from "classnames";
import Hero from "../IndexSections/Hero.js";
import TapsMessages from "../IndexSections/Taps-Messages";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

class Messages extends React.Component {

  state = {
    all_companies: [],
  }

  all_companies = () => {
    axios.get('http://127.0.0.1:8000/company/')
      .then(res => {
        if (res.data) {
          this.setState({ all_companies: res.data })
        }
      })
      .catch(error => console.error(error))
  }
  handleChange=(e)=>{
    console.log(e.target.value);
  }


  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    this.all_companies();

  }

  render() {

    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Hero />


          <section className="section section-components">
            <Container>
              <TapsMessages />
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
                          <DropdownMenu  
                          onChange={this.handleChange}
                          >
                            {this.state.all_companies.map((comp) => (
                              (
                                <>
                                  <DropdownItem value={comp.id}>{comp.name}</DropdownItem>
                                  <DropdownItem divider />
                                </>
                              )
                            ))}
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
