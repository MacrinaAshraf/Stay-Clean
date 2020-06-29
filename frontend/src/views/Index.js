import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Hero from "./IndexSections/Hero.js";
import Blogs from "./IndexSections/Blogs.js";
import TapsMost from "./IndexSections/Taps-Most";
import { Container, Row, Col } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";


class Index extends React.Component {
  state = {
    all_companies: [],
    most_review_program: {},
    most_selected_program: {},
    most_rated_program: {},
  }

  all_companies = () => {
    axios.get('http://127.0.0.1:8000/user-api/company/')
      .then(res => {
        if (res.data) {
          this.setState({ all_companies: res.data })
        }
      })
      .catch(error => console.error(error))
  }


  most_review_program = () => {
    axios.get('http://127.0.0.1:8000/api/programs/most_review_program')
      .then(res => {
        if (res.data.most_review_program) {
          this.setState({ most_review_program: res.data.most_review_program })
        }
        else {
          this.setState({ most_review_program: {} })
        }
      })
      .catch(error => this.setState({ most_review_program: {} })
      )
  }

  most_selected_program = () => {
    axios.get('http://127.0.0.1:8000/api/programs/most_selected_program')
      .then(res => {
        if (res.data.most_selected_program) {
          this.setState({ most_selected_program: res.data.most_selected_program })
        }
        else {
          this.setState({ most_selected_program: {} })
        }
      })
      .catch(error => this.setState({ most_selected_program: {} }))
  }
  most_rated_program = () => {
    axios.get('http://127.0.0.1:8000/api/programs/most_rated_program')
      .then(res => {
        if (res.data.most_rated_program) {
          this.setState({ most_rated_program: res.data.most_rated_program })
        }
        else {
          this.setState({ most_rated_program: {} })
        }
      })
      .catch(error => this.setState({ most_rated_program: {} }))
  }


  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    if (sessionStorage.getItem('is_company') === "false") {
      axios.get('http://127.0.0.1:8000/user-api/customer/me/', {
        headers: {
          Authorization:
            "Token " + localStorage.getItem("token"),
        }
      }).then(res => {
        if (res.data) {
          // console.log(res.data.discount);
          sessionStorage.setItem('discount', res.data['discount'])

        }
      }).catch(error => console.error(error));
    }

    this.all_companies();
    this.most_review_program();
    this.most_selected_program();
    this.most_rated_program();

    this.interval = setInterval(() => {
      this.all_companies();
      this.most_review_program();
      this.most_selected_program();
      this.most_rated_program();

    }, 12000);

  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {

    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Hero />


          <section className="section section-components">
            <Container>
              <TapsMost
                most_selected_program={this.state.most_selected_program}
                most_review_program={this.state.most_review_program}
                most_rated_program={this.state.most_rated_program}
              />
            </Container>
          </section>
          <Blogs />

          <section className="section section-lg">
            <Container>
              <Row className="justify-content-center text-center mb-lg">
                <Col lg="8">
                  <h2 className="display-2">All Companies</h2>
                </Col>
              </Row>
              <Row>
                {this.state.all_companies.length > 0 ?
                  (<>
                    {this.state.all_companies.map(comp => (
                      <Col className="mb-5 mb-lg-0" lg="3" md="6" key={comp.id}>
                        <div className="px-4">
                          <img
                            alt="..."
                            className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                            src={comp.logo}
                            style={{ width: "400px", height: "300px", objectFit: "fill" }}
                          />
                          <div className="pt-5 text-center">
                            <h4 >
                              <Link to={'/company/' + comp.id}><span className="d-block mb-1 font-weight-bold ">{comp.name}</span></Link>

                            </h4>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </>)
                  :
                  (<>
                    <img
                      alt="..."
                      className="img-fluid floating"
                      src={require("assets/img/soon2.jpg")}
                      style={{
                        width: "50%",
                        marginLeft: "250px",
                        marginTop: "-100px"

                      }}
                    />
                  </>)

                }



              </Row>
            </Container>
          </section>
       



          {/* 
            </>)
            :
            (<></>)} */}


          <>

          </>



        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Index;
