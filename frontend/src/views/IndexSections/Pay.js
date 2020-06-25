import React from "react";
import axios from "axios";
import classnames from "classnames";
import PayKey from "../../assets/payKey.js";
import StripeCheckout from 'react-stripe-checkout';
import {
  Button,
  Container,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
  Fade
} from "reactstrap";

class Pay extends React.Component {
  state = {
    payKey: PayKey,
    programCode: 0,
    disablePay: true,
    code: "",
    orderID: 0,
  }
  submitCode = (event) => {
    event.preventDefault();
    // console.log(this.state.code)
    if(this.state.code != "" && Number(this.state.code))
    {
      // console.log("here")

      axios.post("http://localhost:8000/api/selected/user_check_to_pay/",
      {
        code: Number(this.state.code),
      }).then((res) => {
        if(res.data.found)
        {
          this.setState({orderID: Number(this.state.code)-4444,disablePay:false})
        }
        else
        {
          console.log("sorry")
        }

      }).then((err) => {

      });


    }

  }
  handlePayOnline = (token) => {
    axios.post("http://localhost:8000/api/selected/user_pay/",
      {
        select: this.state.orderID,
      }).then(() => {

      });
  }




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

                <Form onSubmit={this.submitCode} style={{ width: "50%" }}>

                  <FormGroup
                    className={classnames("mt-0", {
                      focused: this.state.nameFocused
                    })}
                  >
                    <InputGroup className="input-group-alternative">

                      <Input
                        type="text"
                        placeholder="Enter Order Code"
                        onFocus={e => this.setState({ nameFocused: true })}
                        onBlur={e => this.setState({ nameFocused: false })}
                        value={this.state.code}
                        onChange={e => {
                          this.setState({disablePay:true, code: e.target.value })
                        }}
                      />
                    </InputGroup>
                  </FormGroup>

                  <Button
                    block
                    className="btn-round"
                    color="default"
                  >
                    Check
        </Button>

                </Form>

                <br />
                <br />

                <StripeCheckout
                  stripeKey={this.state.payKey}
                  token={this.handlePayOnline}
                  style={{ width: "100%", height: "100%" }}
                  disabled={this.state.disablePay} />




              </Col>
              <Col className="mb-lg-auto" lg="6">

                <img
                  alt="..."
                  className="img-fluid rounded-circle shadow"
                  src={require("assets/img/pay.png")}
                  style={{ width: "80%" }}
                />

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

export default Pay;
