import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";


class Profile extends React.Component {
  state = {
    data: {
      id: -1
    },
    programs: [],
    count: 0
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/company/${this.props.match.params.id}`)
      .then(res => {
        if (res.data) {
          this.setState({ data: res.data })
        }
      })
      .catch(error => console.error(error))

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (this.state.data.id != -1) {
      this.refs.main.scrollTop = 0
    }
    else {

      axios.get(`http://127.0.0.1:8000/api/programs/${this.props.match.params.id}/company_program`)
        .then(res => {
          if (res.data) {
            this.setState({ count: res.data.length })
            this.setState({ programs: res.data })
          }
        })
        .catch(error => console.error(error))


    }
  }
  render() {
    return (
      <>
        <DemoNavbar />

        {this.state.data.id == -1 ?
          (
            <>  <img
              alt="..."
              className="rounded-circle"
              src={require("assets/img/notFound.jpg")}
            /></>
          )
          :
          (
            <main className="profile-page" ref="main">
              <section className="section-profile-cover section-shaped my-0">
                {/* Circles background */}
                <div className="shape shape-style-1 shape-default alpha-4">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
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
              <section className="section">
                <Container>
                  <Card className="card-profile shadow mt--300">
                    <div className="px-4">
                      <Row className="justify-content-center">
                        <Col className="order-lg-2" lg="3">
                          <div className="card-profile-image">
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              <img
                                alt="..."
                                className="rounded-circle"
                                src={this.state.data.logo}
                                style={{ width: "1000px", height: "200px", objectFit: "fill" }}
                              />
                            </a>
                          </div>
                        </Col>
                        <Col
                          className="order-lg-3 text-lg-right align-self-lg-center"
                          lg="4"
                        >
                          <div className="card-profile-actions py-4 mt-lg-0">

                          </div>
                        </Col>
                        <Col className="order-lg-1" lg="4">
                          <div className="card-profile-stats d-flex justify-content-center">

                            <div>
                              <span className="heading">{this.state.count}</span>
                              <span className="description">program</span>
                            </div>

                          </div>
                        </Col>
                      </Row>
                      <div className="text-center mt-5">
                        <h3>
                          {this.state.data.name}
                        </h3>

                        <div className="h6 mt-2">
                          <i className="ni business_briefcase-24 mr-2" />
                          {this.state.data.description}
                        </div>
                        <div>
                          Location : {this.state.data.address}
                        </div>
                      </div>
                      <div className="mt-5 py-5 border-top text-center">
                        <Row className="justify-content-center">


                        </Row>
                      </div>
                    </div>
                  </Card>
                </Container>
              </section>

              <section className="section section-lg pt-lg-0 mt--200">
                <Container>
                  <Row className="justify-content-center">
                    <Col lg="12">

                      <Row className="row-grid">
                        {this.state.programs.map(program => (
                          <Col lg="4">
                            <Card className="card-lift--hover shadow border-0">
                              <CardBody className="py-5">
                                <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                                  <i className="ni ni-check-bold" />
                                </div>
                                <h6 className="text-primary text-uppercase">
                                  {program.name}
                                </h6>
                                <p className="description mt-3">
                                  {program.description}

                                </p>
                                <div>

                                </div>
                                <Link to={'/program/' + program.id}>

                                  <Button
                                    className="mt-4"
                                    color="primary"
                                  >
                                    Learn more
                          </Button>
                                </Link>                          


                              </CardBody>
                            </Card>
                          </Col>
                        ))}
                      </Row>

                    </Col>
                  </Row>
                </Container>
              </section>

            </main>

          )}
        <SimpleFooter />
      </>
    );
  }
}

export default Profile;
