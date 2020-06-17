    
import React from 'react';
import { Container, Row, Col, Button, Badge, Card, CardBody } from "reactstrap";

    
    const ProgramCard = (props) =>{
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
                      </CardBody>
                    </Card>
                  </Col>

             
        )}

        export default ProgramCard;