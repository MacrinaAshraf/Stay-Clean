import React from "react";
import axios from 'axios';
import classnames from "classnames";
import Geocode from "react-geocode";
import Hero from "../IndexSections/Hero"
import MapKey from "../../assets/mapKey.js";
import GoogleMapReact from 'google-map-react';
import Review from "../IndexSections/Review.js";
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
  UncontrolledCarousel,
} from "reactstrap";

var items = [
  {
    src: require("assets/img/stay/safe.png"),
    altText: "",
    caption: "",
    header: ""
  }
];
const AnyReactComponent = ({ text }) => <div>{text}</div>;

Geocode.setApiKey(MapKey);



class Profile extends React.Component {
  state = {
    index: 0,
    reviews: [],
    selected: 0,
    allprograms: [],
    data: { id: -1 },
    myReview: "",
    myAddress: "",
    myNotes: "",
    myArea: 5,
    myDate: "",
    selectProgramEror: "",
    selectProgramSuccess: "",
    center: {
      lat: 30.033333,
      lng: 31.233334
    },
    lat: 30.033333,
    lng: 31.233334,
    discount: 0,
  }



  handleSelect = (selectedIndex, e) => {
    this.setState({ selectedIndex: selectedIndex })
  };

  handleSubmitReview = event => {
    event.preventDefault();
    if (this.state.myReview != "") {
      axios.post("http://127.0.0.1:8000/api/reviews/", {
        review: this.state.myReview,
        program: this.state.data.id
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

  postSelectedData = self => {

    axios.post("http://localhost:8000/api/selected/", {
      company: this.state.data.company,
      program: this.state.data.id,
      notes: this.state.myNotes,
      address: this.state.lng + "/" + this.state.lat + "/" + this.state.myAddress,
      rate: 0,
      area: this.state.myArea,
      date: new Date(this.state.myDate),
      price: Math.round(((this.state.myArea / 5) * this.state.data.price)* (this.state.discount / 100) ) 

    }, {
      headers: {
        Authorization:
          "Token " + localStorage.getItem("token"),
      },
    }).then(() => {
      this.setState({ myAddress: "" });
      this.setState({ myNotes: "" });
      this.setState({ selectProgramEror: "" });
      this.setState({ selectProgramSuccess: "wait the company will call you soon" });
      window.location.href="http://localhost:3000/selected-programs"
       
      
    }).then(()=>{

    })
  }


  handleSubmitSelect = event => {
    event.preventDefault();
    this.setState({ selectProgramSuccess: "" });
    // console.log(this.state.lng)
    // console.log(this.state.lat)
    // console.log(this.state.myAddress)
    // console.log(this.state.myNotes)
    let date = new Date(this.state.myDate)

    // console.log(date)
    // console.log( new Date())

    if (this.state.myAddress.length > 15 && this.state.myDate != "" && date > new Date()) {
      this.postSelectedData(this)
    }
    else {
      this.setState({ selectProgramEror: "you sholud write your address in details and select futured date" });

    }


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

  getDiscount = async () => {
    if (sessionStorage.getItem('is_company') === "false") {
      axios.get('http://127.0.0.1:8000/user-api/customer/my_discount/', {
        headers: {
          Authorization:
            "Token " + localStorage.getItem("token"),
        }
      }).then(res => {
        if (res.data) {
          console.log(res.data)
          this.setState({ discount: res.data['discount'] })

        }
      }).catch(error => console.error(error));
    }

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

  getReviews = async () => {
    await axios.get(`http://localhost:8000/api/programs/${this.props.match.params.id}/review/`)
      .then(res => {
        this.setState({ reviews: res.data })
      })
      .catch(error => console.error(error))
  };

  componentDidMount() {
    // console.log(sessionStorage.getItem("discount") + " here ")

    this.getProgramData()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (this.state.data.id != -1) {
      this.refs.main.scrollTop = 0
    }
    else {

      this.getSelectedPrograms()
      this.getReviews()
      this.getDiscount()


      this.interval = setInterval(() => {
        this.getSelectedPrograms();
        this.getReviews()
        this.getDiscount()

      }, 8000);

    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // getLocation = (lat, lng, self) => {
  //   Geocode.fromLatLng(lat, lng).then(
  //     response => {
  //       // console.log(lat+"  "+lng)
  //       self.setState({ lat: lat, lng: lng })
  //     },
  //     error => {
  //       console.error(error)
  //     }
  //   );
  // }



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
                style={{
                  width: "50%"
                }}

              /></>
            )
            :
            (
              <main className="profile-page" ref="main">
                <Hero />
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

                {this.state.reviews.length > 0 ?
                  (<>
                    <section className="row-grid align-items-center scrollbar style-9">
                      {this.state.reviews.map((review, index) => (
                        <Review
                          customerID={review.customer}
                          review={review.review}
                        />

                      ))}
                    </section>
                  </>) : (<></>)}

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

                {sessionStorage.getItem("is_company") != "true" ?
                  (<>


                    <section className="section section-lg section-contact-us">
                      <Container>
                        <Row className="justify-content-center mt--200" >
                          <Col lg="8">
                            <Card className="bg-gradient-secondary shadow">
                              <CardBody className="p-lg-5">
                                <h4 className="mb-1">Want to Add Review ?</h4>
                                <Form onSubmit={this.handleSubmitReview}>

                                  <FormGroup
                                    className={classnames("mt-0", {
                                      focused: this.state.nameFocused
                                    })}
                                  >
                                    <InputGroup className="input-group-alternative">

                                      <Input
                             style={{ fontSize:'18px',fontFamily:'Lobster, cursive',color:'navy'}}

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
                                <h4 className="mb-1">
                                  Want to Select ? You Have {this.state.discount} %
                                        </h4>
                                <h6 className="mb-1">please click over your location to get right longitude and latitude</h6>
                                <h6 className="mb-1">current latitude is {this.state.lat}</h6>
                                <h6 className="mb-1">current longitude is {this.state.lng}</h6>


                                <div style={{ height: '50vh', width: '100%' }}>
                                  <GoogleMapReact
                                    bootstrapURLKeys={{ key: "AIzaSyApkOXCx4XowRsfL5pmVApQYmp81LA_PL8" }}
                                    defaultCenter={this.state.center}
                                    defaultZoom={11}
                                    onClick={e => this.setState({ lat: e.lat, lng: e.lng })}
                                  >
                                    <AnyReactComponent
                                      lat={this.state.lat}
                                      lng={this.state.lng}
                                      text="My Marker"
                                    // onClick={e=>console.log(e.lat)}

                                    />
                                  </GoogleMapReact>
                                </div>

                                <br />

                                <Form onSubmit={this.handleSubmitSelect}>


                                  <FormGroup
                                    className={classnames("mt-0", {
                                      focused: this.state.nameFocused
                                    })}
                                  >
                                    <InputGroup className="input-group-alternative">

                                      <Input
                             style={{ fontSize:'18px',fontFamily:'Lobster, cursive',color:'navy'}}

                                        type="text"
                                        onFocus={e => this.setState({ nameFocused: true })}
                                        onBlur={e => this.setState({ nameFocused: false })}
                                        value={this.state.myAddress}
                                        placeholder="Address in Details"
                                        onChange={e => {
                                          this.setState({ myAddress: e.target.value })
                                        }}
                                      />
                                    </InputGroup>
                                  </FormGroup>

                                  <FormGroup
                                    className={classnames("mt-0", {
                                      focused: this.state.nameFocused
                                    })}
                                  >
                                    <InputGroup className="input-group-alternative">

                                      <Input
                             style={{ fontSize:'18px',fontFamily:'Lobster, cursive',color:'navy'}}

                                        type="text"
                                        placeholder="Notes"
                                        onFocus={e => this.setState({ nameFocused: true })}
                                        onBlur={e => this.setState({ nameFocused: false })}
                                        value={this.state.myNotes}
                                        onChange={e => {
                                          this.setState({ myNotes: e.target.value })
                                        }}
                                      />
                                    </InputGroup>
                                  </FormGroup>


                                  <FormGroup
                                    className={classnames("mt-0", {
                                      focused: this.state.nameFocused
                                    })}
                                  >
                                    <InputGroup className="input-group-alternative">

                                      <h5 className="m-1 p-1"> Area </h5>

                                      <Input
                             style={{ fontSize:'18px',fontFamily:'Lobster, cursive',color:'navy'}}

                                        className="ml-2 pl-2"
                                        type="number"
                                        value={this.state.myArea}
                                        onChange={e => {
                                          this.setState({ myArea: e.target.value })
                                        }}
                                        min="5"
                                        
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                  <FormGroup
                                    className={classnames("mt-0", {
                                      focused: this.state.nameFocused
                                    })}
                                  >
                                    <InputGroup className="input-group-alternative">

                                      <Input
                             style={{ fontSize:'18px',fontFamily:'Lobster, cursive',color:'navy'}}
                                         
                                        type="date"
                                        value={this.state.myDate}
                                        onChange={e => {
                                          this.setState({ myDate: e.target.value })
                                        }}
                                      />
                                    </InputGroup>
                                  </FormGroup>





                                  <div>
                                    <Button
                                      block
                                      className="btn-round"
                                      color="default"
                                      style={{
                                        width: "30%"
                                      }}
                                    >
                                      Book
                        </Button>
                                    <br />
                                    {this.state.selectProgramEror ?
                                      (<div className="alert alert-danger p-3" role="alert"> {this.state.selectProgramEror}</div>) :
                                      (<></>)}

                                    {this.state.selectProgramSuccess ?
                                      (<div className="alert alert-success p-3" role="alert"> {this.state.selectProgramSuccess}</div>) :
                                      (<></>)}
                                  </div>

                                </Form>



                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </Container>
                    </section>


                  </>)
                  : (<>

                  </>)}
              </main>


            )
        }
        < SimpleFooter />
      </>
    );
  }
}

export default Profile;








