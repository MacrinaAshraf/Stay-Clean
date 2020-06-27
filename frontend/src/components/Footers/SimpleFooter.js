import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>

        <footer className=" footer">
          <Container>
            <Row className=" row-grid align-items-center mb-5">
              <Col lg="6">
                <h3 className=" text-navcolor font-weight-bold mb-2">
                  Thank you for supporting us!
                </h3>      
              </Col>
              
              
            </Row>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6">
                <div className=" copyright text-navcolor">
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
                <Nav className="justify-content-end ">
                  <NavItem >
                    <NavLink style={{color:'navy'}}
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

export default SimpleFooter;
