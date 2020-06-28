import React from "react";
<<<<<<< HEAD
=======

>>>>>>> 1cefe62c91aa08d3accacdfcb5039b0858a9cd76
import { Button, Container, Row, Col, UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: require("assets/img/dez/dez4.jpg"),
    altText: "",
    caption: "",
    header: ""
  },
  {
    src: require("assets/img/dez/dez19.png"),
    altText: "",
    caption: "",
    header: ""
  },
  {
    src: require("assets/img/dez/dez6.jpg"),
    altText: "",
    caption: "",
    header: ""
  }
];

class Blogs extends React.Component {
  render() {
    return (
      <>
        <section className="section section-shaped" style={{ backgroundColor: "#fce8d5" }}>
          <div className="shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-md">
            <Row className="justify-content-between align-items-center">
              <Col className="mb-5 mb-lg-0" lg="5">
                <h3 className="mb-0"> You Can Get 20% Discount <br />After Booked 5 Programs </h3>


                <img
                  alt="..."
                  className="img-fluid rounded-circle shadow"
                  src={require("assets/img/save.jpeg")}
                  style={{ width: "100%" }}
                />

              </Col>
              <Col className="mb-lg-auto" lg="6">
                <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                  <UncontrolledCarousel items={items} />
                </div>
              </Col>
            </Row>
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
              <polygon className="fill-white" points="2560 0 2560 0 0 100" />
            </svg>
          </div>
        </section>
      </>
    );
  }
}

export default Blogs;
