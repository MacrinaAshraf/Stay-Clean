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


          <h4 className="text-logocolor text-uppercase" ><b>{props.program.name}</b>

          </h4>
          <StarRatingComponent

            name="avgRate"
            starCount={5}
            value={parseInt(props.program.avgRate)}
            editing={false}
          />
        
          <h5 className=" text-logocolor  " >{props.program.description.length > 10 ?
            (<> {props.program.description.substring(0, 20)}... </>) :
            (<>{props.program.description}</>)
            
          }
          
          </h5>
          <div>

            <h3 ><Badge color="logocolor" className="ml-4">
              {props.program.price} $
            </Badge>
              <Badge color="logocolor" className="ml-4" >
                {props.program.duration} 
                {props.program.duration >= 10? (<>hour</>):(<>hours</>)}
            </Badge></h3>



          </div>

          {props.children}
          <div style={{ marginTop: 10 }}>

          </div>

        </CardBody>
      </Card>
      {/* </Link> */}
    </Col>
  );
};

export default ProgramCard;
