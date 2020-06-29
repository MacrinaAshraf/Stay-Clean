import React from "react";
import axios from "axios";
import ConfirmRemovalModal from "./ConfirmRemovalModal.js";
import NewOfferModal from "./NewOfferModal";
import { Link } from 'react-router-dom';

// reactstrap components
import { Container, Row, Col, Card, CardBody, CardFooter } from "reactstrap";


// core components
import Hero from "../../IndexSections/Hero.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
// import StarRatingComponent from "react-star-rating-component";
import SimpleFooter from "components/Footers/SimpleFooter.js";
// import NewProgramForm from "./NewProgramForm.js";


class ListCompanyOffers extends React.Component {
    state = {
        offers: [],
    };

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
        if (sessionStorage.getItem('is_company') === "false") {
            window.location.href = "http://localhost:3000/programs";
        }

        this.resetState();
    }


    getOffers = () => {
        axios.get("http://127.0.0.1:8000/user-api/company/my_offers/", {
            headers: {
                Authorization:
                    "Token " + localStorage.getItem("token"),
            },
        }).then(res => this.setState({ offers: res.data }));

    }

    resetState = () => {
        this.getOffers();
    };

    render() {

        return (
            <>
                <div>
                    <DemoNavbar />

                    <main ref="main">

                        <Hero />

                        <section className="section section-lg pt-lg-0 mt--200">
                            <NewOfferModal create={true} resetState={this.resetState} />
                            <Container>
                                <Row className="justify-content-center">
                                    <Col lg="12">
                                        <Row className="row-grid">
                                            {this.state.offers.map((item) => (
                                                <Container>
                                                    <Card className="card-lift--hover shadow border-0">
                                                        <CardBody className="py-5">
                                                            <h4 className="text-logocolor text-uppercase">{item.offer}</h4>
                                                        </CardBody>
                                                        <CardFooter >
                                                            <NewOfferModal
                                                                create={false}
                                                                item={item}
                                                                resetState={this.resetState}
                                                            />

                                                            <ConfirmRemovalModal
                                                                id={item.id}
                                                                resetState={this.resetState}
                                                            />
                                                        </CardFooter>
                                                    </Card>
                                                    <br />
                                                </Container>
                                            ))}
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </main>
                    <SimpleFooter />
                </div>
            </>
        );
    }
}

export default ListCompanyOffers;
