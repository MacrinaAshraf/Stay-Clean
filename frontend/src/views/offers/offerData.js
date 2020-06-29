import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "assets/css/scroll.css";

import {
    CardBody,
    CardTitle,
} from "reactstrap";

class OfferDetails extends React.Component {

    state = {
        offer: this.props.offer,
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

    render() {
        return (
            <CardBody>
                <CardTitle>
                    <Link to={'/programs/' + this.state.offer.program}><h4>{this.state.program}</h4></Link>
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