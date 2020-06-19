import axios from "axios";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import { Container, Row, Col, Button, Badge, Card, CardBody } from "reactstrap";


const ProgramCard = (props) => {
  const { programID } = useParams();
  const [rating, setRating] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState({ rate: 0 });


  //   const onStarClick = async (nextValue) => {
  //     let temp = { ...userProgram };
  //     temp.myRate = nextValue;
  //     setUserProgram(temp);
  //     console.log(rating, nextValue);

  //     try {
  //         await axios.put(
  //             "http://localhost:8000/company/programs/",
  //             { programID: programID, fieldName: "rate", fieldValue: nextValue },
  //             {
  //                 headers: {
  //                     Authorization:
  //                         "Bearer " + localStorage.getItem("token"),
  //                 },
  //             }
  //         );
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };



  return (

    <Col lg="4">

      <Card className="card-lift--hover shadow border-0">
        <CardBody className="py-5">
          <div className="icon icon-shape icon-shape-info rounded-circle mb-4">
            <i className="ni ni-istanbul" />
          </div>

          <h6 className="text-info text-uppercase">
            {props.program.name}
          </h6>

          <p className="description mt-3">
            {props.program.description}
          </p>
          <div>
            <Badge color="info" pill className="mr-1  ">
              {props.program.price} $
                          </Badge>
            <Badge color="info" pill className="mr-1">
              {props.program.duration} days
                          </Badge>
            <Badge color="info" pill className="mr-1">
              info
                          </Badge>

          </div>

          {props.children}
          <div style={{ marginTop: 10 }}>
            <StarRatingComponent
              name="avgRate"
              starCount={5}
              value={props.program.avgRate}
              editing={false}
            // onStarClick={onStarClick}
            />
          </div>
        </CardBody>
      </Card>
    </Col>


  )
}

export default ProgramCard;