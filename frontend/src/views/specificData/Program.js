import React from "react";
import axios from 'axios';
import classnames from "classnames";
import Review from "../IndexSections/Review.js"
import Hero from "../IndexSections/Hero"
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import {
  Button,
  Card,
  CardBody,
  Container,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
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
    index: 0,
    selected: 0,
    reviews: [],
    allprograms: [],
    data: { id: -1 },
    myReview: "",
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({ selectedIndex: selectedIndex })
  };


  handleSubmit = event => {
    event.preventDefault();
    if (this.state.myReview != "") {
      axios.post("http://127.0.0.1:8000/api/reviews/", {
        review: this.state.myReview,
        program: this.state.data.id
      }, {
        headers: {
          Authorization:
            "Token 687365a03c105c2cbfc33deb0fb9cb342a788c2d",
        },
      }).then(() => {
        this.setState({ myReview: "" });
      });
    };

  }

  getSelectedPrograms = async () => {
    await axios.get(`http://127.0.0.1:8000/api/selected/${this.props.match.params.id}/all_selected`)
      .then(res => {
        if (res.data) {
          this.setState({ selected: res.data.length })
        }
      })
      .catch(error => console.error(error))

  }

  getProgramData = async () => {
    await axios.get(`http://127.0.0.1:8000/api/programs/${this.props.match.params.id}`)
      .then(res => {
        if (res.data) {
          this.setState({ data: res.data })
          items = res.data.images.map(img => {
            return {
              src: img.image,
              altText: "",
              caption: "",
              header: "",
            }
          })
        }
      })
      .catch(error => console.error(error))

  }

// getPhotos = /*async*/ () => {
    // await axios.get(`http://localhost:8000/api/photo/${this.props.match.params.id}/program_photo/`)
    //   .then(res => {
    //     if (res.data.length != 0) {
    
  // };
  // })
  // .catch(error => console.error(error))

getReviews = async () => {
  await axios.get(`http://localhost:8000/api/programs/${this.props.match.params.id}/review/`)
    .then(res => {
      this.setState({ reviews: res.data })
    })
    .catch(error => console.error(error))
};



componentDidMount() {
  this.getProgramData()
  document.documentElement.scrollTop = 0;
  document.scrollingElement.scrollTop = 0;
  if (this.state.data.id != -1) {
    this.refs.main.scrollTop = 0
  }
  else {

    this.getSelectedPrograms()
    // this.getPhotos()
    this.getReviews()

    this.interval = setInterval(() => {
      this.getSelectedPrograms()
      // this.getPhotos()
      this.getReviews()
    }, 8000);

  }
}



componentWillUnmount() {
  clearInterval(this.interval);
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
              <Hero/>
              {/* <section className="section-profile-cover section-shaped my-0" style={{ backgroundImage: "url(" + require("assets/img/bg_1.jpg") + ")", }}>
                
                <div className="shape shape-style-1 shape-default alpha-4">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                
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
              </section> */}
              <section className="section">
                <Container>
                  <Card className="card-profile shadow mt--500">
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
                              <span className="heading">{this.state.selected}</span>
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
                          {this.state.data.name}
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
              <section className="row-grid align-items-center scrollbar style-9">
                {this.state.reviews.map((review, index) => (
                  <Review
                    customerID={review.customer}
                    review={review.review}
                  />

                ))}
              </section>


              <section className="section section-lg bg-gradient-default">
                <Container className="pt-0 pb-25">
                  <Row className="text-center justify-content-center">
                    <Col lg="10">


                    </Col>
                  </Row>

                </Container>
                {/* SVG separator */}
                <div className="separator separator-bottom separator-skew zindex-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 1460 100"
                    x="0"
                    y="0"
                  >
                    <polygon
                      className="fill-white"
                      points="1460 0 1460 0 0 100"
                    />
                  </svg>
                </div>
              </section>
              <section className="section section-lg section-contact-us">
                <Container>
                  <Row className="justify-content-center mt--200" >
                    <Col lg="8">
                      <Card className="bg-gradient-secondary shadow">
                        <CardBody className="p-lg-5">
                          <h4 className="mb-1">Want to Add Review ?</h4>
                          <Form onSubmit={this.handleSubmit}>

                            <FormGroup
                              className={classnames("mt-0", {
                                focused: this.state.nameFocused
                              })}
                            >
                              <InputGroup className="input-group-alternative">

                                <Input
                                  type="text"
                                  onFocus={e => this.setState({ nameFocused: true })}
                                  onBlur={e => this.setState({ nameFocused: false })}
                                  value={this.state.myReview}
                                  onChange={e => {
                                    this.setState({ myReview: e.target.value })
                                  }}
                                />
                              </InputGroup>
                            </FormGroup>

                            <div>
                              <Button
                                block
                                className="btn-round"
                                color="default"
                                size="lg"
                              >
                                Send
                        </Button>
                            </div>

                          </Form>

                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
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
