import React from "react";
import axios from 'axios';
import classnames from "classnames";

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
  FormGroup,
  Container,
  InputGroup,
} from "reactstrap";

class TabsSection extends React.Component {
  state = {
    iconTabs: 1,
    plainTabs: 1,
    send: [],
    recived: [],
    all_companies: {},
  };


  all_send = () => {
    axios.get('http://127.0.0.1:8000/api/message/user_send_messages/', {
      headers: {
        Authorization:
          "Token " + localStorage.getItem("token"),
      }
    })
      .then(res => {
        if (res.data) {
          this.setState({ send: res.data })
        }
      })
      .catch(error => console.error(error))
  }

  all_recived = () => {
    axios.get('http://127.0.0.1:8000/api/message/user_received_messages/', {
      headers: {
        Authorization:
          "Token " + localStorage.getItem("token"),
      }
    })
      .then(res => {
        if (res.data) {
          // console.log(res.data)
          this.setState({ recived: res.data })
        }
      })
      .catch(error => {
      console.log(error);
      if (
        error
          .toString()
          .includes("Request failed with status code 403")
      ) {
        // localStorage.setItem("token", "");
        window.location.href = "http://localhost:3000";
      }
    });
  }


all_companies = () => {
  axios.get('http://127.0.0.1:8000/user-api/company/')
    .then(res => {

      if (res.data) {
        var dict = {}

        res.data.map(comp => {
          dict[comp.id] = comp.name;
        })
        this.setState({ all_companies: dict })
      }
    })
    .catch(error => console.error(error))
}




componentDidMount() {
  this.all_companies();
  this.all_recived();
  this.all_send();

  this.interval = setInterval(() => {
    this.all_companies();
    this.all_recived();
    this.all_send();
  }, 8000);
}

componentWillUnmount() {
  clearInterval(this.interval);
}



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
                  Sent Messages
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
                  Recived Messages
                  </NavLink>
              </NavItem>

            </Nav>
          </div>
          <Card className="shadow">
            <CardBody>
              <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
                <TabPane tabId="iconTabs1">
                  <Row className="row-grid align-items-center" style={{ maxHeight: "300px", overflow: "scroll" }}>
                    <Col className="order-md-0" md="0">


                      {this.state.send.map((mess) => (
                        <section className="section section-lg pt-lg-0 section-contact-us" key={mess.id}>
                          <Container>
                            <Card className="bg-gradient-secondary">
                              <CardBody className="p-lg-5">


                                <FormGroup
                                  className={classnames("mt-2", {
                                    focused: this.state.nameFocused
                                  })}
                                >
                                  <InputGroup className="input-group-alternative">

                                    <Input
                                      type="text"
                                      value={`To : ${this.state.all_companies[mess.company]}`}
                                      disabled={true}

                                    />
                                  </InputGroup>
                                </FormGroup>



                                <FormGroup className="mb-2">
                                  <Input
                                    className="form-control-alternative"
                                    cols="80"
                                    name="name"
                                    placeholder="Type a message..."
                                    rows="4"
                                    type="textarea"
                                    value={`Message : ${mess.message}`}
                                    disabled={true}


                                  />
                                </FormGroup>

                              </CardBody>
                            </Card>
                          </Container>
                        </section>
                      ))}



                    </Col>

                  </Row>
                </TabPane>
                <TabPane tabId="iconTabs2">
                  <Row className="row-grid align-items-center" style={{ maxHeight: "300px", overflow: "scroll" }}>
                    <Col className="order-md-0" md="0">


                      {this.state.recived.map((mess) => (
                        <section className="section section-lg pt-lg-0 section-contact-us" key={mess.id}>
                          <Container>
                            <Card className="bg-gradient-secondary">
                              <CardBody className="p-lg-5">


                                <FormGroup
                                  className={classnames("mt-2", {
                                    focused: this.state.nameFocused
                                  })}
                                >
                                  <InputGroup className="input-group-alternative">
                                    <Input
                                      type="text"
                                      value={`From : ${this.state.all_companies[mess.company]}`}
                                      disabled={true}

                                    />
                                  </InputGroup>
                                </FormGroup>



                                <FormGroup className="mb-2">
                                  <Input
                                    className="form-control-alternative"
                                    cols="80"
                                    name="name"
                                    placeholder="Type a message..."
                                    rows="4"
                                    type="textarea"
                                    value={`Message : ${mess.message}`}
                                    disabled={true}


                                  />
                                </FormGroup>

                              </CardBody>
                            </Card>
                          </Container>
                        </section>
                      ))}



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
