import React from "react";
import axios from 'axios';
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledCarousel
} from "reactstrap";

var items = [
  {
    src: require("assets/img/stay/safe.png"),
    altText: "",
    caption: "",
    header: ""
  }
];
class Profile extends React.Component {
  state = {
    data: { id: -1 },
    allprograms: [],
    index: 0,
    selected:0
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({ selectedIndex: selectedIndex })
  };

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/programs/${this.props.match.params.id}`)
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
          this.setState({count: res.data.count()})
        }
      })
      .catch(error => console.error(error))

      axios.get(`http://localhost:8000/api/photo/${this.props.match.params.id}/program_photo/`)
        .then(res => {
          items = res.data.map(img => {
            return {
              src: "http://localhost:8000" + img.image,
              altText: "",
              caption: "",
              header: "",
            }
          })
        })
        .catch(error => console.error(error))
    }
  }
  render() {
    return (
      <>
        <DemoNavbar />

        {
          this.state.data.id == -1 || this.state.data.is_active == false ?
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
                                <span className="description">selected</span>
                              </div>

                              <div>
                                <span className="heading">{this.state.data.duration}</span>
                                <span className="description">Duration</span>
                              </div>
                              <div>
                                <span className="heading">{this.state.data.price}$</span>
                                <span className="description">Price</span>
                              </div>

                              <div>
                                <span className="heading">{this.state.data.avgRate}/5</span>
                                <span className="description">Rate</span>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <div className="text-center mt-0">
                          <h3>
                            {this.state.name}
                          </h3>
                          <div className="h6 mt-2">
                            <i className="ni business_briefcase-24 mr-2" />
                            {this.state.data.description}
                          </div>
                        </div>
                        <div className="mt-5 py-5 border-top text-center">
                          <Row className="justify-content-center">
                            <Col className="mb-lg-auto" lg="6">
                              <div className="rounded shadow-lg overflow-hidden transform-perspective-right"
                                style={{ width: "500px", height: "400px", objectFit: "fill" }}
                              >
                                <UncontrolledCarousel items={items}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  </Container>
                </section>


              </main>

            )
        }
        < SimpleFooter />
      </>
    );
  }
}

export default Profile;
