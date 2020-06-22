
import React from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import ButtonsComponent from '../Buttons';
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-dark headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-0" to="/" tag={Link} style={{height:"50px"}}>
                <img
                  alt="..."
                  src={require("assets/img/stay/stay1.jpeg")}
                  width="100"
                  style={{height:"50px"}}
                  
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text" style={{color:"#5e72e4"}}>Examples</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/user-messages" tag={Link}>
                        My Messages
                      </DropdownItem>
                      <DropdownItem to="/company-messages" tag={Link}>
                      company Messages
                      </DropdownItem>
                      <DropdownItem to="/programs" tag={Link}>
                         all programs
                      </DropdownItem>
                      <DropdownItem to="/selected-programs" tag={Link}>
                         all selected programs
                      </DropdownItem>
                      <DropdownItem to="/company-selected-programs" tag={Link}>
                         all company selected programs
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="d-none d-lg-block ml-lg-4"> 
                    <ButtonsComponent />
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
