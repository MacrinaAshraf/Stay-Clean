
import React from "react";
import axios from 'axios';

import { Card, Container, Row, Col, UncontrolledCarousel } from "reactstrap";


class Review extends React.Component {
  state = {
    review: this.props.review,
    customerId: this.props.customerID,
    customerName: ""
  }


  getCustomerName =  (id) => {
     axios.get(`http://localhost:8000/user/customer/${id}/customer_name/`)
      .then(res => {
        this.setState({customerName:res.data.name})
      })
  }

  componentDidMount() {


    this.getCustomerName(this.state.customerId);



  }


  render() {
    return (
      <>

        <section className="section section-lg pt-0 pb-2">
          <Container>
            <Card className="bg-gradient-warning shadow-lg border-0">
              <div className="p-2">

                <Row className="align-items-center m-0">
                  <Col>
                    <h3 className="text-white">

                      {this.state.customerName}

                                   :
                                  </h3>

                    <p className="lead text-white mt-3">
                      {this.state.review}

                    </p>
                  </Col>

                </Row>

              </div>
            </Card>

          </Container>










        </section>


      </>

    );
  }
}

export default Review;
