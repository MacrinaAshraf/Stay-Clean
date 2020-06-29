import axios from "axios";
import TableDetails from "./TableDetails";
import Pay from "../IndexSections/Pay.js";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";


const SelectedProgram = (props) => {

    const [selectedProgram, setselectedProgram] = useState([]);
 
    
    if(! localStorage.getItem("token"))
    {
        window.location.href = "/";
    }

    if (sessionStorage.getItem('is_company') === "true") {
        window.location.href = "http://localhost:3000/company-selected-programs";
    }
    



    useEffect(() => {
        axios
            .get('http://localhost:8000/api/selected/user_program/', {
                headers: {
                    Authorization:
                        "Token " + localStorage.getItem("token"),
                }
            })
            .then(res => {
                setselectedProgram(selectedProgram.concat(res.data));

            }).catch(error => {
                // console.log(error);
                if (
                    error
                        .toString()
                        .includes("Request failed with status code 403")
                ) {
                    // localStorage.setItem("token", "");
                    window.location.href = "http://localhost:3000/login";
                }
            });


    }, []);
  

    return (

        <div>
            <DemoNavbar />
            <div className="position-relative" 
            style={{ backgroundImage: "url(" + require("assets/img/stay/stay-clean.jpg")  + ")" , 
            backgroundRepeat: 'no-repeat' , backgroundSize: 'cover' , height:'600px', marginTop:'20px' }}>

                {/* shape Hero */}
                <section className="section section-lg section-shaped pb-250">
                    <div className="shape shape-style-1 shape-default">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    <Container className="py-lg-md d-flex">
                        <div className="col px-0">
                            <Row>
                                <Col lg="6">
                                   



                                </Col>
                            </Row>

                        </div>
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
                            <polygon
                                className="fill-white"
                                // points="2560 0 2560 0 0 100"
                            />
                        </svg>
                    </div>
                </section>

                {/* 1st Hero Variation */}
            </div>
            <br></br>
            <br></br>
            

            <Table className=" table-bordered table-hover mt-2 h5 text-center"  >
                <thead>
                    <tr  style={{ background: 'navy' , color:'orange' , fontSize:'23px' , textAlign:'center',fontFamily:'Lobster, cursive'}}  >
                        <th>Program Name</th>
                        <th>Program Price</th>
                        <th >Note</th>
                        <th>Address</th>
                        <th>Date</th>
                        <th>Rate</th>
                      
                        {sessionStorage.getItem("is_company") === "true" ?
                            <>
                            </> :
                            <>
                            <th>Selected Area</th>
                            <th>Order Code</th>
                            </>
                        }

                    </tr>
                </thead>
                <tbody>
                    {!selectedProgram || selectedProgram.length <= 0 ? (
                        <tr>
                            <td colSpan="6" align="center">
                                <b>Ops, no selected program here yet</b>
                            </td>
                        </tr>
                    ) : (
                            selectedProgram.map(item => (
                                <TableDetails key={item.id} item={item} />
                            ))
                        )}
                </tbody>
            </Table>
            <Pay />
            <SimpleFooter />
        </div>

    );
};

export default SelectedProgram;