import React from "react";
import axios from 'axios';
import classnames from "classnames";
import { Link } from "react-router-dom";
import Review from "../IndexSections/Review.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import "assets/css/scroll.css";
import OfferDetails from '../offers/offerData';

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
  CardHeader,
  CardTitle,
} from "reactstrap";


class Profile extends React.Component {

  state = {
    data: {
      id: -1
    },
    programs: [],
    count: 0,
    reviews: [],
    offers: []
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.myReview != "") {
      axios.post("http://127.0.0.1:8000/api/reviewsC/", {
        review: this.state.myReview,
        company: this.state.data.id
      }, {
        headers: {
          Authorization:
            "Token " + localStorage.getItem("token"),
        },
      }).then(() => {
        this.setState({ myReview: "" });
      });
    };

  }


  getCompanyData = async () => {
    axios.get(`http://127.0.0.1:8000/user-api/company/${this.props.match.params.id}`)
      .then(res => {
        if (res.data) {
          this.setState({ data: res.data })
        }
      })
      .catch(error => console.error(error))

  }

  getCompanyOffers = async () => {
    axios.get(`http://127.0.0.1:8000/user-api/company/${this.props.match.params.id}/company_offers/`)
      .then(res => {
        if (res.data) {
          // console.log(res.data)
          // console.log(this._isMounted)
          // if (this._isMounted) {
            this.setState({ offers: res.data })
          // }
        }
      })
      .catch(error => {})
  }

  getCompany_program = async () => {
    axios.get(`http://127.0.0.1:8000/api/programs/${this.props.match.params.id}/company_program`)
      .then(res => {
        if (res.data) {
          this.setState({ count: res.data.length })
          this.setState({ programs: res.data })
        }
      })
      .catch(error => console.error(error))

  }

  getReviews = async () => {
    axios.get(`http://localhost:8000/user-api/company/${this.props.match.params.id}/review/`)
      .then(res => {
        this.setState({ reviews: res.data })
      })
      .catch(error => console.error(error))

  }
  componentDidMount() {
    this.getCompanyData();
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (this.state.data.id != -1) {
      this.refs.main.scrollTop = 0
    }
    else {

      this.getCompany_program();
      this.getReviews();
      this.getCompanyOffers();

      this.interval = setInterval(() => {

        this.getCompany_program();
        this.getReviews();
        this.getCompanyOffers();
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

        {this.state.data.id == -1 ?
          (
            <>  <img
              alt="..."
              className="rounded-circle"
              src={require("assets/img/notFound.jpg")}
              style={{
                width: "50%"
              }}
            /></>
          )
          :
          (
            <main className="profile-page" ref="main">
              <section className="section-profile-cover" style={{ backgroundImage: "url(" + require("assets/img/bg_2.jpg") + ")" }}>
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
                              <h3 className="heading text-logocolor">{this.state.count}</h3>
                              <h3 className="description text-logocolor font-weight-bold">programs</h3>
                            </div>

                          </div>
                        </Col>
                      </Row>
                      <div className="text-center mt-5 ">
                        <h2 className="text-logocolor font-weight-bold">
                          {this.state.data.name}
                        </h2>

                        <div className="h6 mt-2">
                          <h4 className="text-logocolor " >
                          {this.state.data.description}
                          </h4>
                        </div>
                        <h4  className="text-logocolor ">
                          Location : {this.state.data.address}
                        </h4>
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
                                <div className="icon icon-shape icon-shape-logocolor rounded-circle mb-4">
                                  <i className="ni ni-check-bold" />
                                </div>
                                <h5 className="text-logocolor text-uppercase font-weight-bold">
                                  {program.name}
                                </h5>
                                
          <h5 className=" text-logocolor  " >{program.description.length > 10 ?
            (<> {program.description.substring(0, 40)}... </>) :
            (<>{program.description}</>)
            
          }
          
          </h5>
                                <div>

                                </div>
                                <Link to={'/programs/' + program.id}>

                                  <Button
                                    className="mt-4"
                                    color="logocolor"
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

              <br />

              {this.state.offers.length > 0 ?
                (<>
                  <Container>
                    <Card style={{ fontSize:'20px',color:'navy',fontFamily:'Lobster, cursive'}}>
                      <CardHeader>
                        <h3>Company Offers</h3>
                      </CardHeader>
                      <section className="row-grid align-items-center scrollbar style-9">
                        {this.state.offers.map((offer, index) => (
                          <OfferDetails key={offer.id} offer={offer}/>
                        ))}
                      </section>
                    </Card>
                  </Container>
                </>) :
                (<></>)}



              <br />

              {this.state.reviews.length > 0 ?
                (<>
                  <Container>
                    <Card>
                      <section className="row-grid align-items-center scrollbar style-9">


                        {this.state.reviews.map((review, index) => (
                          <CardBody>
                            <Review
                              customerID={review.customer}
                              review={review.review}
                            />
                          </CardBody>

                        ))}

                      </section>
                    </Card>
                  </Container>
                </>) :
                (<></>)}



              {sessionStorage.getItem("is_company") != "true" ?
                (<>

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
                                 style={{ fontSize:'20px',fontFamily:'Lobster, cursive',color:'navy'}}
                                      
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
                                    style={{ fontSize:'20px',fontFamily:'Lobster, cursive',color:'orange'}}

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

                </>) : (<></>)}


            </main>

          )}
        <SimpleFooter />
      </>
    );
  }
}

export default Profile;
