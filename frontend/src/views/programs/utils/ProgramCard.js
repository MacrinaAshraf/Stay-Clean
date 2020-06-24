import React from "react";
import StarRatingComponent from "react-star-rating-component";
import { Col, Badge, Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';


const ProgramCard = (props) => {

  return (
    <Col lg="4">
      {/* <Link to={'/programs/' + props.program.id}> */}
      <Card className="card-lift--hover shadow border-0">
        <CardBody className="py-5">
          <div className="icon icon-shape icon-shape-info rounded-circle mb-4">
            <i className="ni ni-istanbul" />
          </div>

          <h6 className="text-info text-uppercase">{props.program.name}</h6>

          <p className="description mt-3">{props.program.description}</p>
          <div>
            <Badge color="info" pill className="mr-1  ">
              {props.program.price} $
            </Badge>
            <Badge color="info" pill className="mr-1">
              {props.program.duration} days
            </Badge>
          </div>

          {props.children}
          <div style={{ marginTop: 10 }}>
            <StarRatingComponent
              name="avgRate"
              starCount={5}
              value={parseInt(props.program.avgRate)}
              editing={false}
            />
          </div>
          <Link 
            color="info"
            className="mt-4 btn-outline-info btn"
            to={'/programs/' + props.program.id}
          >
            view
          </Link>
        </CardBody>
      </Card>
      {/* </Link> */}
    </Col>
  );
};

export default ProgramCard;
