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
      })
      .catch(error => console.error(error))
  }

  most_selected_program = () => {
    axios.get('http://127.0.0.1:8000/api/programs/most_selected_program')
      .then(res => {
        if (res.data.most_selected_program) {
          this.setState({ most_selected_program: res.data.most_selected_program })
        }
      })
      .catch(error => console.error(error))
  }

  getUserDetails = () => {
    if (localStorage.getItem('token')) {
      axios.get('http://127.0.0.1:8000/user-api/user/me/', {
        headers: {
          Authorization:
            "Token " + localStorage.getItem("token"),
        }
      }).then(res => {
        if (res.data) {
          sessionStorage.setItem('is_company', res.data['is_company'])
          sessionStorage.setItem('email', res.data['email'])
        }
      }).catch(error => console.error(error));
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;


    this.all_companies();
    this.most_review_program();
    this.most_selected_program();
    this.getUserDetails();
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
              />
            </Container>
          </section>
          <Blogs />

          <section className="section section-lg">
            <Container>
              <Row className="justify-content-center text-center mb-lg">
                <Col lg="8">
                  <h2 className="display-3">The amazing Companies</h2>
                </Col>
              </Row>
              <Row>
                {this.state.all_companies.map(comp => (
                  <Col className="mb-5 mb-lg-0" lg="3" md="6" key={comp.id}>
                    <div className="px-4">
                      <img
                        alt="..."
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        src={comp.logo}
                        style={{ width: "200px", height: "100px", objectFit: "fill" }}
                      />
                      <div className="pt-4 text-center">
                        <h5 className="title">
                          <Link to={'/company/' + comp.id}><span className="d-block mb-1">{comp.name}</span></Link>

                        </h5>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Index;
