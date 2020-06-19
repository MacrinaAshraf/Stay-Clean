import React from "react";
import { Container, Row, Button, Col } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Hero from "./IndexSections/Hero.js";
import Blogs from "./IndexSections/Blogs.js";
import TapsMost from "./IndexSections/Taps-Most";
import axios from 'axios';
class Index extends React.Component {

  state = {
    all_companies: [],
    most_review_program: {},
    most_selected_program: {},
  }

  all_companies = () => {
    axios.get('http://127.0.0.1:8000/company/' , {
      headers: {
          Authorization:
              "Token ebbc0d47e9b1dcbd3d71ed795e61d01c595279fd",
      },})
      .then(res => {
        // console.log("res.data.all_companies")
        console.log(res.data)

        if (res.data) {
          this.setState({ all_companies: res.data })

        }
      })
      .catch(error => console.error(error))
  }

  most_review_program = () => {
    axios.get('http://127.0.0.1:8000/most_review_program/' , {
      headers: {
          Authorization:
              "Token ebbc0d47e9b1dcbd3d71ed795e61d01c595279fd",
      },})
      .then(res => {
        // console.log("most_review_program")
        // console.log(res.data)
        if (res.data.most_review_program) {
          this.setState({ most_review_program: res.data.most_review_program })

        }

      })
      .catch(error => console.error(error))
  }

  most_selected_program = () => {
    axios.get('http://127.0.0.1:8000/most_selected_program/' , {
      headers: {
          Authorization:
              "Token ebbc0d47e9b1dcbd3d71ed795e61d01c595279fd",
      },})
      .then(res => {
        console.log("res.data.most_selected_program")
        console.log(res.data)
        if (res.data.most_selected_program) {
          this.setState({ most_selected_program: res.data.most_selected_program })
        }


      })
      .catch(error => console.error(error))
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;


    this.all_companies();
    this.most_review_program();
    this.most_selected_program();

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
                  <Col className="mb-5 mb-lg-0" lg="3" md="6">





                    <div className="px-4">
                      <img
                        alt="..."
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        src={require("assets/img/theme/team-2-800x800.jpg")}
                        style={{ width: "200px" }}
                      />
                      <div className="pt-4 text-center">
                        <h5 className="title">
                          <span className="d-block mb-1">{comp.name}</span>
                          <small className="h6 text-muted">Web Developer</small>
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
