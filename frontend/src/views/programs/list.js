import React from "react";
import axios from "axios";
import ProgramCard from "./ProgramCard.js";
// reactstrap components
import { Container, Row, Col, Button, Badge, Card, CardBody } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class List extends React.Component {
  state = {
    programs: [],
    companies: [],
  };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    axios.get("http://127.0.0.1:8000/company/programs/").then((res) => {
      this.setState({
        programs: res.data,
      });
      console.log(res.data);
    });
    axios.get("http://127.0.0.1:8000/company/").then((res) => {
        this.setState({
          companies: res.data,
        });
        console.log(res.data);
      });
  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <div
            className="position-relative"
            style={{
              backgroundImage: "url(" + require("assets/img/bg_1.jpg") + ")",
            }}
          >
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h1 className="display-3 text-dark">
                        List Company's Programs{" "}
                      </h1>
                      <p className="lead text-white">
                        The design system comes with four pre-built pages to
                        help you get started faster. You can change the text and
                        images and you're good to go.
                      </p>
                      <div className="btn-wrapper"></div>
                    </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
          <section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
               
                  {this.state.programs.map((item) => (
                  
                      <ProgramCard program={item} />
                
                  ))}
                   
                </Row>
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

export default List;
