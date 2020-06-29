import React, { useState, useEffect } from "react";
import axios from 'axios';
// import classnames from "classnames";
import { Link } from "react-router-dom";
// import Review from "../IndexSections/Review.js";
// import DemoNavbar from "components/Navbars/DemoNavbar.js";
// import SimpleFooter from "components/Footers/SimpleFooter.js";
import "assets/css/scroll.css";

import {
    CardBody,
    CardTitle,
} from "reactstrap";

class OfferDetails extends React.Component { // ({ offer, programs }) => {

    state = {
        offer: this.props.offer,
        // customerId: this.props.customerID,
        program: ""
    }

    getProgramName = (programID) => {
        axios.get(`http://127.0.0.1:8000/api/programs/${programID}/`, {
            headers: {
                Authorization:
                    "Token " + localStorage.getItem("token"),
            },
        }).then(res => {
            this.setState({ program: res.data.name })
        });
    }

    componentDidMount() {
        this.getProgramName(this.state.offer.program);
    }

    // const [program, setProgram] = useState({});


    // useEffect(async () => {
    //     await axios.get(`http://127.0.0.1:8000/api/programs/${offer.program}`, {
    //         headers: {
    //             Authorization:
    //                 "Token " + localStorage.getItem("token"),
    //         },
    //     }).then(res => {
    //         setProgram(res.data)
    //     });

    // });

    render() {
        return (
            <CardBody>
                <CardTitle>
                    <h4>{this.state.program}</h4>
                </CardTitle>
                <CardTitle>
                    {this.state.offer.offer}
                </CardTitle>
                <hr />
            </CardBody>
        );
    }
}

export default OfferDetails;