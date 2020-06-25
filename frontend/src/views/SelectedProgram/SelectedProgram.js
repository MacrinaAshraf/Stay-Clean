import axios from "axios";
import TableDetails from "./TableDetails";
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
                console.log(error);
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
            <div
                className="position-relative"
                style={{
                    backgroundImage: "url(" + require("assets/img/bg_1.jpg") + ")",
                }}
            >
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
                                    <h1 className="display-3 text-dark">
                                        List selected Company's Programs for user{" "}
                                    </h1>



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
                                points="2560 0 2560 100 0 100"
                            />
                        </svg>
                    </div>
                </section>

                {/* 1st Hero Variation */}
            </div>


            <Table  >
                <thead>
                    <tr>
                        <th>note</th>
                        <th>address</th>
                        <th>rate</th>
                        <th>program name</th>
                        <th>program price</th>
                        {sessionStorage.getItem("is_company") === "true" ?
                            <>
                            </> :
                            <>
                            <th>your area</th>
                            <th>payed</th>
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
            <SimpleFooter />
        </div>

    );
};

export default SelectedProgram;