
import React from "react";

// reactstrap components
import { Progress, Col } from "reactstrap";

class ShowImage extends React.Component {
  render() {
    return (
      <>
        <Col lg="5">

          <img
            alt="..."
            className="img-fluid"
            src={require("assets/img/dez/dez2.png")}
          />

        </Col>
      </>
    );
  }
}

export default ShowImage;
