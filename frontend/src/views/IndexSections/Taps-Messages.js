import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
  Input,
  InputGroupAddon,
  FormGroup,
  InputGroupText,
  Container,
  InputGroup,



} from "reactstrap";

class TabsSection extends React.Component {
  state = {
    iconTabs: 1,
    plainTabs: 1
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
  render() {
    return (
      <>
        <Row className="justify-content-center">
          <Col lg="12">
            {/* Tabs with icons */}
            <div className="mb-3">
              <small className="text-uppercase font-weight-bold">

              </small>
            </div>
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 1
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    Send Messages
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 2
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 2)}
                    href="#pablo"
                    role="tab"
                  >
                    Recive Messages
                  </NavLink>
                </NavItem>

              </Nav>
            </div>
            <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
                  <TabPane tabId="iconTabs1">
                    <Row className="row-grid align-items-center" style={{ maxHeight: "425px", overflow: "scroll" }}>
                      <Col className="order-md-0" md="0">


                        <section className="section section-lg pt-lg-0 section-contact-us">
                          <Container>
                            <Card className="bg-gradient-secondary shadow">
                              <CardBody className="p-lg-5">


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

                              </CardBody>
                            </Card>
                          </Container>
                        </section>



                        <section className="section section-lg pt-lg-0 section-contact-us">
                          <Container>
                            <Card className="bg-gradient-secondary shadow">
                              <CardBody className="p-lg-5">


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

                              </CardBody>
                            </Card>
                          </Container>
                        </section>



                        <section className="section section-lg pt-lg-0 section-contact-us" >
                          <Container>
                            <Card className="bg-gradient-secondary shadow">
                              <CardBody className="p-lg-5">


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

                              </CardBody>
                            </Card>
                          </Container>
                        </section>


                      </Col>

                    </Row>
                  </TabPane>
                  <TabPane tabId="iconTabs2">
                    <Row className="row-grid align-items-center" style={{ maxHeight: "425px", overflow: "scroll" }}>
                      <Col className="order-md-0" md="0">

                        <section className="section section-lg pt-lg-0 section-contact-us">
                          <Container>
                            <Card className="bg-gradient-secondary shadow">
                              <CardBody className="p-lg-5">


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

                              </CardBody>
                            </Card>
                          </Container>
                        </section>



                        <section className="section section-lg pt-lg-0 section-contact-us">
                          <Container>
                            <Card className="bg-gradient-secondary shadow">
                              <CardBody className="p-lg-5">


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

                              </CardBody>
                            </Card>
                          </Container>
                        </section>



                        <section className="section section-lg pt-lg-0 section-contact-us" >
                          <Container>
                            <Card className="bg-gradient-secondary shadow">
                              <CardBody className="p-lg-5">


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

                              </CardBody>
                            </Card>
                          </Container>
                        </section>





                      </Col>

                    </Row>

                  </TabPane>

                </TabContent>
              </CardBody>
            </Card>
          </Col>



        </Row>
      </>
    );
  }
}

export default TabsSection;
