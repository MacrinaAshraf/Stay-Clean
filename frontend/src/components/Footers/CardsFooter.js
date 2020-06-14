import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardImg,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class CardsFooter extends React.Component {
  render() {
    return (
      <>
        <footer className="footer has-cards">
          <Container className="container-lg">
            <Row>
              <Col className="mb-5 mb-md-0" md="6">
                <Card className="card-lift--hover shadow border-0">
                  <Link to="/landing-page">
                    <CardImg
                      alt="..."
                      src={require("assets/img/theme/landing.jpg")}
                    />
                  </Link>
                </Card>
              </Col>
              <Col className="mb-5 mb-lg-0" md="6">
                <Card className="card-lift--hover shadow border-0">
                  <Link to="/profile-page">
                    <CardImg
                      alt="..."
                      src={require("assets/img/theme/profile.jpg")}
                    />
                  </Link>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="row-grid align-items-center my-md">
              <Col lg="6">
             
             
              </Col>
             
              </Row>
            <hr />
            <Row className="align-items-center justify-content-md-between">
              <Col md="6">
                <div className="copyright">
                  © {new Date().getFullYear()}{" "}
                  <a
                    href="http://www.iti.gov.eg/"
                    target="_blank"
                  >
                    ITI
                  </a>
                  
                </div>
              </Col>
              <Col md="6">
                <Nav className="nav-footer justify-content-end">
                  <NavItem>
                    <NavLink
                      href="http://www.iti.gov.eg/Admission/PTPprogram/intake40/OSDtrack"
                      target="_blank"
                    >
                      Open Source Application Development 
                  
                    </NavLink>
                  </NavItem>
               
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default CardsFooter;
