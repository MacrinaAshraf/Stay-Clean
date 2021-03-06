import React from "react";
import classnames from "classnames";
import {
  Card,
  CardBody,
  Col,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
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
                    style={{ color: 'darkorange', fontSize: '20px', fontWeight: 'bold' }}
                    aria-selected={this.state.iconTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 1
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    Most Selected Program
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ color: 'darkorange', fontSize: '20px', fontWeight: 'bold' }}
                    aria-selected={this.state.iconTabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 2
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 2)}
                    href="#pablo"
                    role="tab"
                  >
                    Most Reviewed Program
                  </NavLink>
                </NavItem>


                <NavItem>
                  <NavLink
                    style={{ color: 'darkorange', fontSize: '20px', fontWeight: 'bold' }}
                    aria-selected={this.state.iconTabs === 3}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 3
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 3)}
                    href="#pablo"
                    role="tab"
                  >
                   Most Rated Program
                  </NavLink>
                </NavItem>
            
            
              </Nav>
            </div>
            <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
                  <TabPane tabId="iconTabs1">
                    <Row className="row-grid align-items-center">
                      <Col className="order-md-2" md="6">
                        <img
                          alt="..."
                          className="img-fluid floating"
                          src={require("assets/img/dez/dez12.jpg")}
                        />
                      </Col>
                      <Col className="order-md-2" md="6">
                        {this.props.most_selected_program.id ?
                          (<>

                            <h3 className="display-3">
                              {this.props.most_selected_program.name}
                            </h3>

                            <br />
                            <p className="display-4" >

                              {this.props.most_selected_program.description.substring(0, 30)}

                              <br />
                              <br />
                              <b>Duration:</b> {this.props.most_selected_program.duration}
                              {this.props.most_selected_program.duration > 1 &&
                                this.props.most_selected_program.duration < 11 ? (
                                  <> Hours</>
                                ) : (
                                  <> Hour</>
                                )}
                              <br />
                              <br />
                              <b>Cost:</b> {this.props.most_selected_program.price}/5m<sup>2</sup > $

                        </p>

                          </>)
                          :
                          (<>
                            <img
                              alt="..."
                              className="img-fluid floating"
                              src={require("assets/img/soon.png")}
                            />
                          </>)
                        }

                      </Col>

                    </Row>
                  </TabPane>
                  <TabPane tabId="iconTabs2">
                    <Row className="row-grid align-items-center">
                      <Col className="order-md-2" md="6">
                        <img
                          alt="..."
                          className="img-fluid floating"
                          src={require("assets/img/dez/dez12.jpg")}
                        />
                      </Col>
                      <Col className="order-md-2" md="6">

                        {this.props.most_review_program.id ?
                          (<>
                            <h3 className="display-3">
                              {this.props.most_review_program.name}
                            </h3>
                            <br />
                            <p className="display-4">

                              {this.props.most_review_program.description.substring(0, 30)}
                              <br />
                              <br />
                              <b>Duration: </b>{this.props.most_review_program.duration}
                              {this.props.most_review_program.duration > 1 &&
                                this.props.most_review_program.duration < 11 ? (
                                  <> Hours</>
                                ) : (
                                  <> Hour</>
                                )}
                              <br />
                              <br />
                              <b>Cost: </b> {this.props.most_selected_program.price}/5m<sup>2</sup > $


                        </p>
                          </>)
                          :
                          (<>
                            <img
                              alt="..."
                              className="img-fluid floating"
                              src={require("assets/img/soon.png")}
                            />
                          </>)
                        }
                      </Col>

                    </Row>

                  </TabPane>

                  <TabPane tabId="iconTabs3">
                    <Row className="row-grid align-items-center">
                      <Col className="order-md-2" md="6">
                        <img
                          alt="..."
                          className="img-fluid floating"
                          src={require("assets/img/dez/dez12.jpg")}
                        />
                      </Col>
                      <Col className="order-md-2" md="6">
                        
                        {this.props.most_rated_program.id ?
                          (<>

                            <h3 className="display-3">
                              {this.props.most_rated_program.name}
                            </h3>

                            <br />
                            <p className="display-4" >

                              {this.props.most_rated_program.description.substring(0, 30)}
                              <br />
                              <br />
                              <b>Duration:</b> {this.props.most_rated_program.duration}
                              {this.props.most_rated_program.duration > 1 &&
                                this.props.most_rated_program.duration < 11 ? (
                                  <> Hours</>
                                ) : (
                                  <> Hour</>
                                )}
                              <br />
                              <br />
                              <b>Cost:</b> {this.props.most_rated_program.price}/5m<sup>2</sup > $

                        </p>

                          </>)
                          :
                          (<>
                            <img
                              alt="..."
                              className="img-fluid floating"
                              src={require("assets/img/soon.png")}
                            />
                          </>)
                        }

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
