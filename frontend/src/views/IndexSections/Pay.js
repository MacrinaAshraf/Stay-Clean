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
  UncontrolledCarousel
} from "reactstrap";



let items = [
  {
    src: require("assets/img/dez/dez4.jpg"),
    altText: "",
    caption: "",
    header: ""
  },
  {
    src: require("assets/img/dez/dez19.png"),
    altText: "",
    caption: "",
    header: ""
  },
  {
    src: require("assets/img/dez/dez6.jpg"),
    altText: "",
    caption: "",
    header: ""
  }
];
class Pay extends React.Component {
  state = {
    payKey: PayKey,
    programCode: 0,
    disablePay: true,
    code: "",
    orderID: 0,
    all_adv: []

  }
  submitCode = (event) => {
    event.preventDefault();
    // console.log(this.state.code)
    if (this.state.code != "" && Number(this.state.code)) {
      // console.log("here")

      axios.post("http://localhost:8000/api/selected/user_check_to_pay/",
        {
          code: Number(this.state.code),
        }).then((res) => {
          if (res.data.found) {
            this.setState({ orderID: Number(this.state.code) - 4444, disablePay: false })
          }
          else {
            console.log("sorry")
          }

        }).then((err) => {

        });


    }

  }
  handlePayOnline = (token) => {
    axios.put("http://localhost:8000/api/selected/user_pay/",
      {
        select: this.state.orderID,
      }).then(() => {
        this.setState({ disablePay: true })

      });
  }
  all_adv = () => {
    axios.get('http://127.0.0.1:8000/api/adv/')
      .then(res => {
        console.log("here")
        if (res.data.length > 0) {
          res.data.map(adv=>{
            this.setState({
              all_adv: [...this.state.all_adv, {
                src: adv.image,
                altText: "",
                caption: "",
                header: ""
              }]} )
          })
          console.log("here")

          
        }
      })
      .then(res=>{
        console.log("here")
        console.log(this.state.all_adv)

      })
      .catch(error => console.error(error))
  }
  componentDidMount() {
    this.all_adv()
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
                          this.setState({ disablePay: true, code: e.target.value })
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

                {/* <StripeCheckout
                  stripeKey={this.state.payKey}
                  token={this.handlePayOnline}
                  style={{ width: "100%", height: "100%" }}
                  disabled={this.state.disablePay} /> */}




              </Col>
              <Col className="mb-lg-auto" lg="6">
                <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                  <UncontrolledCarousel items={this.state.all_adv} />
                </div>
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
